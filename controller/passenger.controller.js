import Passenger from "../model/passenger.model.js";
import ResponseModel from "../model/response.model.js";

let resModel = ResponseModel;

const addPassenger = async (req, res) => {
  try {
    const data = req.body;

    const passenger = await Passenger.create({
      flightID: data.flightID,
      name: data.name,
      passportNumber: data.passportNumber,
      visaNumber: data.visaNumber,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      nationality: data.nationality,
      reservationID: data.reservationID,
      userID: req.user.id,
    });

    resModel.msg = "Passenger added successfully!";
    resModel.status = 200;
    resModel.data = passenger;
    res.status(resModel.status).json(resModel);
    return;
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
};

const getPassenger = async (req, res) => {
  try {
    const id = req.user.id;
    const reservationID = req.params.reservationID;

    const passengers = await Passenger.findAll({
      where: { userID: id, reservationID: reservationID },
    });

    resModel.msg = "Passenger fetched successfully!";
    resModel.status = 200;
    resModel.data = passengers;
    res.status(resModel.status).json(resModel);
    return;
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
};

export default { addPassenger, getPassenger };
