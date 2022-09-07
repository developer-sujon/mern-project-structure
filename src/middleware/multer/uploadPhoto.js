//External import
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

//Internal import
const { CreateError } = require("../../helper/ErrorHandler");

//Storage
const multerStorage = multer.memoryStorage();

//Image File Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Type" }, false);
  }
};

//Image Upload
const imageUpload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: multerFilter,
});

const resizeImg = async (req, res, next) => {
  if (!req.file) return next();

  const fileExt = path.extname(req.file.originalname);
  const formetFileName =
    req.file.originalname
      .replace(fileExt, "")
      .toLowerCase()
      .split(" ")
      .join("-") +
    "-" +
    Date.now() +
    fileExt;

  try {
    await sharp(req.file.buffer)
      .resize(250, 250)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(`public/images/blogs/${formetFileName}`));

    req.file.filename = formetFileName;
    next();
  } catch (e) {
    CreateError(e.message, e.status);
  }
};

module.exports = {
  resizeImg,
  imageUpload,
};
