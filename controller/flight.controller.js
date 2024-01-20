import Flight from "../model/flight.model.js";
import ResponseModel from "../model/response.model.js";
import checkUserRole from "../utils/checkUser.util.js";

let resModel = ResponseModel;

const addFlight = async (req, res) => {
  try {
    const data = req.body;

    let checkUserRes = checkUserRole(req.user);
    if (checkUserRes) {
      resModel = checkUserRes;
      res.status(resModel.status).json(resModel);
      return;
    }

    const flight = await Flight.create({
      flightName: data.flightName,
      sourceID: data.sourceID,
      destinationID: data.destinationID,
      arrivalTime: data.arrivalTime,
      estimatedTravellingHour: data.estimatedTravellingHour,
      classType: data.classType,
      fare: data.fare,
    });

    resModel.msg = "Flight added successfully!";
    resModel.status = 200;
    resModel.data = [flight];
    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
};

const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll();
    resModel.msg = "All flights fetched successfully!";
    resModel.status = 200;
    resModel.data = flights;
    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];

    res.status(resModel.status).json(resModel);
  }
};

export default { addFlight, getAllFlights };
