import jwt from "jsonwebtoken";
import ResponseModel from "../model/response.model.js";
import User from "../model/user.model.js";

let resModel = ResponseModel;

const Auth = async (req, res, next) => {
  try {
    var dateNow = new Date();
    const authToken = req.header("Authorization");
    // console.log(authToken);
    if (!authToken) {
      resModel.status = 401;
      resModel.msg = "Access denied";
      resModel.data = [];

      res.status(resModel.status).json(resModel);
      return;
    }
    const token = authToken.split(" ")[1];
    // console.log(token);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decode);
    // console.log(dateNow.getTime() / 1000);
    if (decode.exp < dateNow.getTime() / 1000) {
      resModel.status = 400;
      resModel.msg = "Token expired";
      resModel.data = [];

      res.status(resModel.status).json(resModel);
      return;
    }

    const user = await User.findOne({
      where: { id: decode.id, email: decode.email },
    });

    if (!user) {
      resModel.status = 404;
      resModel.msg = "User not found";
      resModel.data = [];

      res.status(resModel.status).json(resModel);
      return;
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    resModel.status = 400;
    resModel.msg = error.message;
    resModel.data = [];

    res.status(resModel.status).json(resModel);
  }
};

export default Auth;
