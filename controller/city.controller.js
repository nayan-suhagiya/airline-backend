import City from "../model/city.model.js";
import ResponseModel from "../model/response.model.js";
import checkUserRole from "../utils/checkUser.util.js";

let resModel = ResponseModel;

const addCity = async (req, res) => {
  try {
    let checkUserRes = checkUserRole(req.user);
    if (checkUserRes) {
      resModel = checkUserRes;
      res.status(resModel.status).json(resModel);
      return;
    }

    const data = req.body;

    const city = await City.create({ cityName: data.cityName });

    resModel.msg = "City added successfully!";
    resModel.status = 200;
    resModel.data = city;
    res.status(resModel.status).json(resModel);
    return;
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
};

const getCities = async (req, res) => {
  try {
    const cities = await City.findAll();

    resModel.msg = "Cities fetched successfully!";
    resModel.status = 200;
    resModel.data = cities;
    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
};

export default { addCity, getCities };
