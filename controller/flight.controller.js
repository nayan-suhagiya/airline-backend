import Flight from "../model/flight.model.js";
import ResponseModel from "../model/response.model.js";
import checkUserRole from "../utils/checkUser.util.js";
import City from "../model/city.model.js";

let resModel = ResponseModel;

const addFlight = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);

    let checkUserRes = checkUserRole(req.user);
    if (checkUserRes) {
      resModel = checkUserRes;
      res.status(resModel.status).json(resModel);
      return;
    }

    const flight = await Flight.create({
      flightNumber: data.flightNumber,
      departureID: data.departureID,
      destinationID: data.destinationID,
      departureTime: data.departureTime,
      arrivalTime: data.arrivalTime,
      totalCapacity: data.totalCapacity,
      availableSeats: data.availableSeats,
      classType: data.classType,
      baseFare: data.baseFare,
    });

    resModel.msg = "Flight added successfully!";
    resModel.status = 200;
    resModel.data = flight;
    res.status(resModel.status).json(resModel);
  } catch (error) {
    console.log(error);
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
};

const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll({
      include: [
        { model: City, as: 'departureCity', attributes: ['cityName'] },
        { model: City, as: 'destinationCity', attributes: ['cityName'] }
      ]
    });

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



const editFlight = async (req, res) => {
  try {
    const data = req.body;
    let checkUserRes = checkUserRole(req.user);
    let flight;
    if (checkUserRes) {
      resModel = checkUserRes;
      res.status(resModel.status).json(resModel);
      return;
    }

    const flightId = req.params.id;

    flight = await Flight.findByPk(flightId);
    if (!flight) {
      resModel.msg = "Flight not found!";
      resModel.status = 404;
      resModel.data = [];
      res.status(resModel.status).json(resModel);
      return;
    }

    const UpdatedFlight = await Flight.update(
      {
        flightNumber: data.flightNumber ?? flight.flightNumber,
        departureID: data.departureID,
        destinationID: data.destinationID,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime,
        totalCapacity: data.totalCapacity,
        availableSeats: data.availableSeats,
        classType: data.classType,
        baseFare: data.baseFare,
      },
      { where: { id: req.params.id } }
    );

    if(UpdatedFlight){
      flight = await Flight.findByPk(req.params.id);
    }

    resModel.msg = "Flight updated successfully!";
    resModel.status = 200;
    resModel.data = flight;
    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
}

const deleteFlight = async (req, res) => {
  try {
    let checkUserRes = checkUserRole(req.user);
    if (checkUserRes) {
      resModel = checkUserRes;
      res.status(resModel.status).json(resModel);
      return;
    }

    const flightId = req.params.id;
    const flight = await Flight.findByPk(flightId);

    if (!flight) {
      resModel.msg = "Flight not found!";
      resModel.status = 404;
      resModel.data = [];
      res.status(resModel.status).json(resModel);
      return;
    }

    await Flight.destroy({ where: { id: flightId } });

    resModel.msg = "Flight deleted successfully!";
    resModel.status = 200;
    resModel.data = flight;
    res.status(resModel.status).json(resModel);
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
}

export default { addFlight, getAllFlights,editFlight,deleteFlight };
