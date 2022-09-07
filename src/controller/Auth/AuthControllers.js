//Internal Import
const UsersModel = require("../../model/Users/UsersModel");
const RegistrationService = require("../../services/Auth/RegistrationService");
const LoginService = require("../../services/Auth/LoginService");

/**
 * @desc Register User
 * @access public
 * @route /api/v1/auth/RegisterUser
 * @methud POST
 */

const RegisterUser = async (req, res, next) => {
  try {
    const result = await RegistrationService(req, UsersModel);
    res.json({ message: "User Register Successfull" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Login User
 * @access public
 * @route /api/v1/auth/LoginUser
 * @methud POST
 */

const LoginUser = async (req, res, next) => {
  try {
    const result = await LoginService(req, UsersModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
};
