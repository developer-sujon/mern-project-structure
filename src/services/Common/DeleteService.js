const DeleteService = async (Request, DataModel) => {
  const DeleteID = Request.params.id;
  const UserEmail = Request.Email;

  const QueryObject = {};
  QueryObject._id = DeleteID;
  QueryObject.UserEmail = UserEmail;

  const data = await DataModel.deleteMany(QueryObject);
  return data;
};

module.exports = DeleteService;
