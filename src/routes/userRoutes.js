//External Import
const userRoutes = require("express").Router();

//Internal Import
const {
  selectUser,
  updateUser,
  deleteUser,
  verifyAccountSendOtp,
  verifyAccountVerifyOtp,
  recoveryAccountSendOtp,
  recoveryAccountVerifyOtp,
  recoveryPassword,
} = require("../controller/userControllers");
const { userAuth, adminAuth } = require("../middleware/checkAuthLogin");
const {
  imageUpload,
  resizeAvata,
} = require("../middleware/multer/uploadPhoto");

//Select User
userRoutes.get("/selectUser", userAuth, selectUser);

//Update User
userRoutes.patch(
  "/updateUser",
  imageUpload.single("avata"),
  resizeAvata,
  userAuth,
  updateUser,
);

//Delete User
userRoutes.delete("/deleteUser", userAuth, deleteUser);

// Verify Account Send Otp
userRoutes.get("/verifyAccountSendOtp", verifyAccountSendOtp);

// Verify Account Verify Otp
userRoutes.get(
  "/verifyAccountVerifyOtp/:otpCode",
  verifyAccountVerifyOtp,
);

// Recovery Account Send Otp
userRoutes.get("/recoveryAccountSendOtp/:email", recoveryAccountSendOtp);

// Recovery Account Verify Otp
userRoutes.get(
  "/recoveryAccountVerifyOtp/:email/:otpCode",
  recoveryAccountVerifyOtp,
);

// Recovery Password
userRoutes.get("/recoveryPassword/:email/:otpCode", recoveryPassword);

module.exports = userRoutes;
