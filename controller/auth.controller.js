import ResponseModel from "../model/response.model.js";
import User from "../model/user.model.js";
import hashPassword from "../utils/password.util.js";

let resModel = ResponseModel;

const registerUser = async (req, res) => {
  try {
    // console.log(req.body);
    const data = req.body;
    data.password = hashPassword(data.password);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    resModel.status = 201;
    resModel.msg = "User registration successfully";
    resModel.data = [{ name: user.name, email: user.email }];

    res.status(resModel.status).json(resModel);
  } catch (err) {
    resModel.status = 400;
    resModel.msg = err.errors[0].message;
    resModel.data = [err.fields];

    res.status(resModel.status).json(resModel);
  }
};

export default { registerUser };
