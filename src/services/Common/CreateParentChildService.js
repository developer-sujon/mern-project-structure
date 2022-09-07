const CreateParentChildService = async (
  Request,
  ParentModel,
  ChildModel,
  JoinPropertyName,
  session,
) => {
  //create parent
  const parent = Request.body["Parent"];
  parent.UserEmail = Request.Email;
  const newParent = new ParentModel(parent);
  const parentCreation = await newParent.save({ session });

  //create child
  const child = Request.body["Child"];

  child.forEach((element) => {
    element[JoinPropertyName] = parentCreation._id;
    element["UserEmail"] = Request.Email;
  });

  const childCreation = await ChildModel.insertMany(child, { session });

  return { parent: parentCreation, child: childCreation };
};

module.exports = CreateParentChildService;
