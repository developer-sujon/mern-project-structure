//external import
const mongoose = require("mongoose");
const { createError } = require("../helper/errorHandler");

const connectDB = async (DATABASE_URL, DB_OPTIONS) => {
  try {
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log(DB_OPTIONS.dbName + " DB Connected Successfully...");
  } catch (error) {
    throw createError(DB_OPTIONS.dbName + " DB Connected Failure");
  }
};

module.exports = connectDB;
