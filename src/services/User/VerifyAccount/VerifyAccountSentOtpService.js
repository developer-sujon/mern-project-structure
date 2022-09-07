//Internal import
const { CreateError } = require("../../../helper/ErrorHandler");
const GenRandNumber = require("../../../helper/GenRandNumber");
const CreateToken = require("../../../utility/CreateToken");
const SendMailUtility = require("../../../utility/SendMailUtility");

const VerifyAccountSentOtpService = async (Request, UsersModel, OtpModel) => {
  const { Email } = Request.params;

  const User = await UsersModel.aggregate([{ $match: { Email: Email } }]);
  if (!User.length > 0) {
    throw CreateError("User Not Found", 404);
  }

  const OtpCode = await CreateToken({ Email });

  const EmailBody = `<div>${User[0].Name},
  We're happy you signed up for ${process.env.APPLICATION_NAME} To start exploring the Ring App and neighborhood, please confirm your email address. <a href="${process.env.ACCOUNT_VERIFY_EMAIL_URL}/User/VerifyAccountVerifyOtp/${Email}/${OtpCode}">Verify Now</a> </div>`;

  const EmailSubject = `Your ${process.env.APPLICATION_NAME} Account Verification Link`;

  await SendMailUtility(Email, EmailBody, EmailSubject);

  const newOtpCode = new OtpModel({
    OtpCode: OtpCode,
    Email: Email,
  });

  await newOtpCode.save();

  return { messge: "Otp Send Successfull" };
};
module.exports = VerifyAccountSentOtpService;
