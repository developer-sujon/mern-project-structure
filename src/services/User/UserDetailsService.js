const UserDetailsService = async (Request, DataModel) => {
  const { Email } = Request;

  const User = await DataModel.aggregate([
    { $match: { Email: Email } },
    {
      $project: {
        Name: 1,
        Phone: 1,
        UserName: 1,
        Email: 1,
        Roles: 1,
        Image: 1,
      },
    },
  ]);

  return User;
};
module.exports = UserDetailsService;
