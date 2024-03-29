import ResponseModel from "../model/response.model.js";
import User from "../model/user.model.js";
import hashPassword from "../utils/password.util.js";
import generateAuthToken from "../utils/token.util.js";
import bcrypt from "bcryptjs";

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
    resModel.data = { name: user.name, email: user.email };

    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.status = 400;
    resModel.msg = error.errors[0].message;
    resModel.data = [error.fields];

    res.status(resModel.status).json(resModel);
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findOne({ where: { email: data.email } });

    // console.log("user fetched successfully in login api >>>>>>>",user);

    if (!user) {
      resModel.status = 404;
      resModel.msg = "User not found";
      resModel.data = [];

      res.status(resModel.status).json(resModel);
      return;
    }

    const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordMatch) {
      resModel.status = 400;
      resModel.msg = "Invalid credentials";
      resModel.data = [];

      res.status(resModel.status).json(resModel);
      return;
    }

    const token = await generateAuthToken({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      name: user.name,
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    resModel.status = 200;
    resModel.msg = "Login successfully";
    resModel.data = {
      isAdmin: user.isAdmin,
      email: user.email,
      token: token,
      id: user.id,
    };

    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.status = 400;
    resModel.msg = error.message;
    resModel.data = [error.fields];

    res.status(resModel.status).json(resModel);
  }
};

const getValidUser = async (req, res) => {
  try {
    // console.log(req.body);
    resModel.status = 200;
    resModel.msg = "Valid user found";
    resModel.data = req.user;

    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.status = 400;
    resModel.msg = error.message;
    resModel.data = [error.fields];

    res.status(resModel.status).json(resModel);
  }
};

export default { registerUser, loginUser, getValidUser };
