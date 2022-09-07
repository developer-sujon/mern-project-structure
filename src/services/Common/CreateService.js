const CreateService = async (Request, DataModel) => {
  const PostBody = Request.body;
  PostBody.UserEmail = Request.Email;

  const data = new DataModel(PostBody);
  return await data.save();
};

module.exports = CreateService;
