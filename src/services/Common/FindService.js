const ObjectId = require("mongoose").Types.ObjectId;

const FindService = async (Request, DataModel) => {
  const FindID = Request.params.id;
  const UserEmail = Request.Email;

  const QueryObject = {};
  QueryObject._id = ObjectId(FindID);
  QueryObject.UserEmail = UserEmail;

  const data = await DataModel.aggregate([
    {
      $match: QueryObject,
    },
  ]);
  return data;
};

module.exports = FindService;
