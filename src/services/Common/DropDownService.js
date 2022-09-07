const DropDownService = async (Request, DataModel, Projection) => {
  const UserEmail = Request.Email;
  const data = DataModel.aggregate([
    { $match: { UserEmail: UserEmail } },
    { $project: Projection },
  ]);
  return data;
};

module.exports = DropDownService;
