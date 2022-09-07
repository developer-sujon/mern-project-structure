//Internal Import
const UsersModel = require("../../model/Users/UsersModel");
const OtpModel = require("../../model/Otps/OtpModel");
const UserDetailsService = require("../../services/User/UserDetailsService");
const UserUpdateService = require("../../services/User/UserUpdateService");
const UserDeleteService = require("../../services/User/UserDeleteService");
const RecoveryResetPassService = require("../../services/User/RecoveryAccount/RecoveryResetPassService");
const VerifyRecoveryOtpService = require("../../services/User/RecoveryAccount/VerifyRecoveryOtpService");
const SendRecoveryOtpService = require("../../services/User/RecoveryAccount/SendRecoveryOtpService");
const VerifyAccountSentOtpService = require("../../services/User/VerifyAccount/VerifyAccountSentOtpService");
const VerifyAccountVerifyOtpService = require("../../services/User/VerifyAccount/VerifyAccountVerifyOtpService");
const UserPasswordChangeService = require("../../services/User/UserPasswordChangeService");

/**
 * @desc User Details
 * @access private
 * @route /api/v1/User/UserDetails
 * @methud GET
 */
const UserDetails = async (req, res, next) => {
  try {
    const result = await UserDetailsService(req, UsersModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc User Change Password
 * @access private
 * @route /api/v1/User/UserChangePassword
 * @methud PUT
 */
const UserChangePassword = async (req, res, next) => {
  try {
    const result = await UserPasswordChangeService(req, UsersModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update User
 * @access private
 * @route /api/v1/User/UserUpdate
 * @methud PATCH
 */
const UserUpdate = async (req, res, next) => {
  try {
    const result = await UserUpdateService(req, UsersModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc User Delete
 * @access private
 * @route /api/v1/User/UserDelete
 * @methud DELETE
 */

const UserDelete = async (req, res, next) => {
  try {
    const result = await UserDeleteService(req, UsersModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Send Recovery Otp
 * @access public
 * @route /api/v1/User/SendRecoveryOtp/:Email
 * @methud GET
 */

const SendRecoveryOtp = async (req, res, next) => {
  try {
    const result = await SendRecoveryOtpService(req, UsersModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Verify Recovary Otp
 * @access public
 * @route /api/v1/User/VerifyRecoveryOtp/:/Email/:OtpCode
 * @methud GET
 */

const VerifyRecoveryOtp = async (req, res, next) => {
  console.log(3);
  try {
    const result = await VerifyRecoveryOtpService(req, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Recovery Reset Password
 * @access public
 * @route /api/v1/User/RecoveryResetPass/:Email/:OtpCode
 * @methud POST
 */

const RecoveryResetPass = async (req, res, next) => {
  try {
    const result = await RecoveryResetPassService(req, UsersModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Verify Account Sent Otp
 * @access public
 * @route /api/v1/User/VerifyAccountSentOtp/:Email
 * @methud GET
 */

const VerifyAccountSentOtp = async (req, res, next) => {
  try {
    const result = await VerifyAccountSentOtpService(req, UsersModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Verify Account Verify Otp
 * @access public
 * @route /api/v1/User/VerifyAccountVerifyOtp/:Email/:OtpCode
 * @methud GET
 */

const VerifyAccountVerifyOtp = async (req, res, next) => {
  try {
    const result = await VerifyAccountVerifyOtpService(
      req,
      UsersModel,
      OtpModel,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  UserDetails,
  UserChangePassword,
  UserUpdate,
  UserDelete,
  SendRecoveryOtp,
  VerifyRecoveryOtp,
  RecoveryResetPass,
  VerifyAccountSentOtp,
  VerifyAccountVerifyOtp,
};
