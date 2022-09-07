//Internal import
const { CreateError } = require("../../../helper/ErrorHandler");
const GenRandNumber = require("../../../helper/GenRandNumber");
const SendMailUtility = require("../../../utility/SendMailUtility");

const SendRecoveryOtpService = async (Request, UsersModel, OtpModel) => {
  const { Email } = Request.params;

  const User = await UsersModel.aggregate([{ $match: { Email: Email } }]);
  if (!User.length > 0) {
    throw CreateError("User Not Found", 404);
  }

  const OtpCode = GenRandNumber(6);

  const EmailBody = `<p>${User[0].Name},
  Your ${process.env.APPLICATION_NAME} Account Recovery Code is <b>${OtpCode}</b> </p>`;

  const EmailSubject = `Your ${process.env.APPLICATION_NAME} Account Recovery Code`;

  await SendMailUtility(Email, EmailBody, EmailSubject);

  const newOtpCode = new OtpModel({
    OtpCode: OtpCode,
    Email: Email,
  });

  await newOtpCode.save();

  return { message: "Otp Send Successfull" };
};
module.exports = SendRecoveryOtpService;
