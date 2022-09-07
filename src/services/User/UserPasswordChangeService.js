//External Import
const bcrypt = require("bcrypt");

//Internal Import
const { CreateError } = require("../../helper/ErrorHandler");

const UserPasswordChangeService = async (Request, DataModel) => {
  const { Email } = Request;
  let { Password, PreviousPassword } = Request.body;

  const verifyPassword = await bcrypt.compare(
    PreviousPassword,
    Request.Password,
  );
  console.log(verifyPassword);
  if (!verifyPassword) {
    throw CreateError("Previous Password Not Match", 401);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(Password, salt);
  Password = hash;

  await DataModel.updateOne({ Email: Email }, { Password }, { new: true });

  return { message: "User Password Change Successfull" };
};
module.exports = UserPasswordChangeService;
