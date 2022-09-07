const ListTwoJoinService = async (
  Request,
  DataModel,
  SearchArray,
  JoinStageOne,
  JoinStageTwo,
  projection,
) => {
  const UserEmail = Request.Email;
  const searchKeyword = Request.params.searchKeyword;
  const pageNumber = +Request.params.pageNumber;
  const perPage = +Request.params.perPage;

  const skipRow = (pageNumber - 1) * perPage;
  let data;

  if (searchKeyword !== "0") {
    data = await DataModel.aggregate([
      {
        $match: { UserEmail: UserEmail },
      },
      JoinStageOne,
      JoinStageTwo,
      {
        $match: { $or: SearchArray },
      },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [{ $skip: skipRow }, { $limit: perPage }, projection],
        },
      },
    ]);

    return data;
  } else {
    data = await DataModel.aggregate([
      {
        $match: { UserEmail: UserEmail },
      },
      JoinStageOne,
      JoinStageTwo,
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [{ $skip: skipRow }, { $limit: perPage }, projection],
        },
      },
    ]);

    return data;
  }
};

module.exports = ListTwoJoinService;
