//external import
const UsersModel = require("../model/Users/UsersModel");

//internal import
const { CreateError } = require("../helper/ErrorHandler");
const DecodedToken = require("../utility/DecodedToken");

/**
 * @desc Check User Auth
 * @access public
 * @route /api/v1/auth/login
 * @methud POST
 */

const UserAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw CreateError("Unauthorized Credentials ", 401);
    }

    let token = authorization.split(" ")[1];

    if (!token) {
      throw CreateError("No Token", 401);
    }

    const decoded = await DecodedToken(token);

    if (!decoded) {
      throw CreateError("Invalid Token", 401);
    }

    const user = await UsersModel.aggregate([
      {
        $match: { Email: decoded.Email },
      },
    ]);

    if (!user.length > 0) {
      throw CreateError("User Not Found", 401);
    }

    req.id = user[0]._id;
    req.Email = user[0].Email;
    req.Password = user[0].Password;

    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

/**
 * @desc Check Admin Auth
 * @access public
 * @route /api/v1/auth/login
 * @methud POST
 */
const AdminAuth = async (req, res, next) => {
  try {
    const { Email } = req;

    const admin = await UsersModel.aggregate([
      {
        $match: {
          $and: [{ Email: Email }, { Roles: "ADMIN" }],
        },
      },
    ]);

    if (!admin.length > 0) {
      throw CreateError("Invalid Credentials", 401);
    }

    req.Roles = admin[0].Roles;

    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

module.exports = {
  UserAuth,
  AdminAuth,
};
