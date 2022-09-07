const UnblockUserService = async (Request, UsersModel) => {
  const Email = Request.Email;

  await UsersModel.updateOne(
    { Email: Email },
    {
      AccountStatus: "ACTIVE",
    },
  );

  return { message: "User Unblock Successfull" };
};

module.exports = UnblockUserService;
