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

const editCity = async (req, res) => {
  try {
    let checkUserRes = checkUserRole(req.user);
    if (checkUserRes) {
      resModel = checkUserRes;
      res.status(resModel.status).json(resModel);
      return;
    }

    const cityid = req.params.id;
    const data = req.body;


    await City.update(
      { cityName: data.cityName },
      { where: { id: cityid } }
    );

    const updatedCity = await City.findByPk(cityid);

    resModel.msg = "City updated successfully!";
    resModel.status = 200;
    resModel.data = updatedCity;
    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
}

const deleteCity = async (req, res) => {
  try {
    let checkUserRes = checkUserRole(req.user);
    if (checkUserRes) {
      resModel = checkUserRes;
      res.status(resModel.status).json(resModel);
      return;
    }

    const cityid = req.params.id;

    await City.destroy({ where: { id: cityid } });

    resModel.msg = "City deleted successfully!";
    resModel.status = 200;
    resModel.data = [{ deletedCityId: cityid }];
    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
}

export default { addCity, getCities, editCity, deleteCity };
