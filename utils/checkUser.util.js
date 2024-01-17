import ResponseModel from "../model/response.model.js";

let resModel = ResponseModel;

const checkUserRole = (user) => {
  if (!user.isAdmin) {
    resModel.msg = "You are not authorized to perform this action!";
    resModel.status = 401;
    resModel.data = [];

    return resModel;
  }
};

export default checkUserRole;
