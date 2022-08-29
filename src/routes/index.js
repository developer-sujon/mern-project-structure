//External import
const routes = require("express").Router();

//Internal Import
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");

//auth Routes
routes.use("/auth", authRoutes);

//user Routes
routes.use("/user", userRoutes);

//admin Routes
routes.use("/admin", adminRoutes);

module.exports = routes;
