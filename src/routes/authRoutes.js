//External Import
const AuthRoutes = require("express").Router();

//Internal Import
const AuthControllers = require("../controller/auth/AuthControllers");

//Register User
AuthRoutes.post("/RegisterUser", AuthControllers.RegisterUser);

//Login User
AuthRoutes.post("/LoginUser", AuthControllers.LoginUser);

module.exports = AuthRoutes;
