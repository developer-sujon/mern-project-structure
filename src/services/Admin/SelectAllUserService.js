const SelectAllUserService = async (Request, UsersModel) => {
  const Users = await UsersModel.aggregate([
    {
      $project: {
        Name: 1,
        Phone: 1,
        Email: 1,
        Roles: 1,
        Image: 1,
        AccountStatus: 1,
      },
    },
  ]);

  return Users;
};

module.exports = SelectAllUserService;
