//External Import
const ObjectId = require("mongoose").Types.ObjectId;

//Internal Import
const { CreateError } = require("../../helper/ErrorHandler");

const UpdateService = async (Request, DataModel) => {
  const UserEmail = Request.Email;
  const UpdateID = Request.params.id;
  const PostBody = Request.body;
  PostBody.UserEmail = UserEmail;

  const axisData = await DataModel.aggregate([
    {
      $match: {
        $and: [{ UserEmail: UserEmail }, { _id: ObjectId(UpdateID) }],
      },
    },
  ]);

  if (!axisData.length > 0) {
    throw CreateError(
      `${DataModel?.collection?.collectionName} Not Found`,
      404,
    );
  }

  const data = await DataModel.updateOne(
    { _id: UpdateID, UserEmail: UserEmail },
    PostBody,
    {
      new: true,
    },
  );
  return data;
};

module.exports = UpdateService;
