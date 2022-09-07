const UserUpdateService = async (Request, DataModel) => {
  const { Email } = Request;
  const { Name, Phone, Image } = Request.body;

  await DataModel.updateOne(
    { Email: Email },
    { Name, Phone, Image },
    { new: true },
  );

  return { message: "User Update Successfull" };
};
module.exports = UserUpdateService;
