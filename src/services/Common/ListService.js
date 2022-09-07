const ListService = async (Request, DataModel, SearchArray) => {
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
      {
        $match: { $or: SearchArray },
      },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [{ $skip: skipRow }, { $limit: perPage }],
        },
      },
    ]);

    return data;
  } else {
    data = await DataModel.aggregate([
      {
        $match: { UserEmail: UserEmail },
      },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [{ $skip: skipRow }, { $limit: perPage }],
        },
      },
    ]);

    return data;
  }
};

module.exports = ListService;
