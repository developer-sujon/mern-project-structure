//External import
const { model, Schema } = require("mongoose");

const BlogsSchema = new Schema(
  {
    UserEmail: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
    },
    View: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

const BlogModel = new model("Blog", BlogsSchema);
module.exports = BlogModel;
