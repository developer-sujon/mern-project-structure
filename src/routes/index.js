//External import
const routes = require("express").Router();

//Internal Import
const AuthRoutes = require("./AuthRoutes");
const UserRoutes = require("./UserRoutes");
const AdminRoutes = require("./AdminRoutes");
const BlogRoutes = require("./BlogRoutes");

//Auth Routes
routes.use("/Auth", AuthRoutes);

//User Routes
routes.use("/User", UserRoutes);

//User Routes
routes.use("/Admin", AdminRoutes);

//Brand Routes
routes.use("/Blog", BlogRoutes);

module.exports = routes;
