//External Import
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

//External import
const BlogModel = require("../../model/Blogs/BlogsModel");
const { CreateError } = require("../../helper/ErrorHandler");

const CreateService = require("../../services/common/CreateService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");
const DeleteService = require("../../services/Common/DeleteService");
const FindService = require("../../services/Common/FindService");

const {
  cloudinaryUpload,
  cloudinaryDelete,
} = require("../../utility/cloudinary");

/**
 * @desc Blog Create
 * @access private
 * @route /api/v1/Blog/BlogCreate
 * @methud POST
 */

const BlogCreate = async (req, res, next) => {
  try {
    const localPath = `public/images/blogs/${req.file.filename}`;
    const imgUploaded = await cloudinaryUpload(localPath);

    req.body.Image = imgUploaded?.url;
    req.body.public_id = imgUploaded?.public_id;
    fs.unlinkSync(localPath);

    const result = await CreateService(req, BlogModel);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Blog List
 * @access private
 * @route /api/v1/Blog/BlogList/:pageNumber/:perPage/:searchKeyword
 * @methud GET
 */

const BlogList = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [{ Title: SearchRgx }, { Description: SearchRgx }];

  try {
    const result = await ListService(req, BlogModel, SearchArray);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Blog Single
 * @access private
 * @route /api/v1/Blog/BlogSingle/:id
 * @methud GET
 */

const BlogSingle = async (req, res, next) => {
  try {
    const result = await FindService(req, BlogModel);

    await BlogModel.updateOne(
      { _id: req.params.id },
      { $inc: { View: 1 } },
      { new: true },
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Blog Update
 * @access private
 * @route /api/v1/Blog/BlogUpdate/:id
 * @methud PATCH
 */

const BlogUpdate = async (req, res, next) => {
  try {
    if (req?.file?.filename) {
      const Blog = await FindService(req, BlogModel);
      await cloudinaryDelete(Blog?.[0]?.public_id);

      const localPath = `public/images/blogs/${req.file.filename}`;
      const imgUploaded = await cloudinaryUpload(localPath);
      req.body.Image = imgUploaded?.url;
      req.body.public_id = imgUploaded?.public_id;
      fs.unlinkSync(localPath);
    }

    const result = await UpdateService(req, BlogModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Blog  Delete
 * @access private
 * @route /api/v1/Blog/BlogDelete/:id
 * @methud DELETE
 */

const BlogDelete = async (req, res, next) => {
  try {
    const Blog = await FindService(req, BlogModel);
    await cloudinaryDelete(Blog?.[0]?.public_id);
    const result = await DeleteService(req, BlogModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  BlogCreate,
  BlogList,
  BlogSingle,
  BlogUpdate,
  BlogDelete,
};
