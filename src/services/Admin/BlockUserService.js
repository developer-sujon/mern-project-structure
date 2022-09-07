const BlockUserService = async (Request, UsersModel) => {
  const { Email } = Request.params;

  await UsersModel.updateOne(
    { Email: Email },
    {
      AccountStatus: "REJECTED",
    },
  );

  return { message: "User Block Successfull" };
};

module.exports = BlockUserService;
