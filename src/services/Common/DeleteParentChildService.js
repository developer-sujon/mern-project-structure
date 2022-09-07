const DeleteParentChildService = async (
  Request,
  ParentModel,
  ChildModel,
  JoinPropertyName,
  Session,
) => {
  const DeleteId = Request.params.id;
  const ChildDeleteQuery = {};
  ChildDeleteQuery[JoinPropertyName] = DeleteId;
  ChildDeleteQuery["UserEmail"] = Request.Email;

  const deleteChild = await ChildModel.deleteMany(ChildDeleteQuery).session(
    Session,
  );

  const ParentDeleteQuery = {};
  ParentDeleteQuery["_id"] = DeleteId;
  ParentDeleteQuery["UserEmail"] = Request.Email;

  const deleteParent = await ParentModel.deleteMany(ParentDeleteQuery).session(
    Session,
  );

  return { deleteChild, deleteParent };
};

module.exports = DeleteParentChildService;
