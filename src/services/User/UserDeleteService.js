const UserDeleteService = async (Request, DataModel) => {
  const { Email } = Request;
  await DataModel.deleteOne({ Email: Email });
  return { message: "User Delete Successfull" };
};
module.exports = UserDeleteService;
