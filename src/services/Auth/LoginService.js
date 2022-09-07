//External Import
const bcrypt = require("bcrypt");

//Internal Import
const CreateToken = require("../../utility/CreateToken");
const { CreateError } = require("../../helper/ErrorHandler");

const LoginService = async (Request, DataModel) => {
  const { Email, Phone, Password } = Request.body;

  if (!Email || !Password) {
    throw CreateError("Invalid Data", 400);
  }
  const User = await DataModel.aggregate([
    { $match: { $or: [{ Email }, { Phone }] } },
  ]);

  if (!User.length > 0) {
    throw CreateError("User Not found", 404);
  }

  const verifyPassword = await bcrypt.compare(Password, User[0].Password);
  if (!verifyPassword) {
    throw CreateError("Unauthorized Credentials", 401);
  }

  const payLoad = {
    id: User[0]._id,
    Roles: User[0].Roles,
    Email: User[0].Email,
  };

  const token = await CreateToken(payLoad);

  return { accessToken: token, message: "User Login Successfull" };
};

module.exports = LoginService;
