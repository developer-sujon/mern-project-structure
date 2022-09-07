//External Import
const UserRoutes = require("express").Router();

//Internal Import
const { UserAuth } = require("../middleware/checkAuthLogin");
const UserControllers = require("../controller/User/UserControllers");

//User Profile
UserRoutes.get("/UserDetails", UserAuth, UserControllers.UserDetails);

//User Change Password
UserRoutes.put(
  "/UserChangePassword",
  UserAuth,
  UserControllers.UserChangePassword,
);

//Update User
UserRoutes.patch("/UserUpdate", UserAuth, UserControllers.UserUpdate);

//Delete User
UserRoutes.delete("/UserDelete", UserAuth, UserControllers.UserDelete);

//Send Recovery Otp
UserRoutes.get("/SendRecoveryOtp/:Email", UserControllers.SendRecoveryOtp);

//Verify Recovary Otp
UserRoutes.get(
  "/VerifyRecoveryOtp/:Email/:OtpCode",
  UserControllers.VerifyRecoveryOtp,
);

//Recovery Reset Pass
UserRoutes.post(
  "/RecoveryResetPass/:Email/:OtpCode",
  UserControllers.RecoveryResetPass,
);

//Verify Account Sent Otp
UserRoutes.get(
  "/VerifyAccountSentOtp/:Email",
  UserControllers.VerifyAccountSentOtp,
);

//Verify Account Verify Otp
UserRoutes.get(
  "/VerifyAccountVerifyOtp/:Email/:OtpCode",
  UserControllers.VerifyAccountVerifyOtp,
);

module.exports = UserRoutes;
