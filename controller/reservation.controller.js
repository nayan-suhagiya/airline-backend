import Reservation from "../model/reservation.model.js";
import ResponseModel from "../model/response.model.js";

let resModel = ResponseModel;

const bookReservation = async (req, res) => {
  try {
    const data = req.body;
    const reservation = await Reservation.create({
      flightID: data.flightID,
      journyDate: data.journyDate,
      userID: req.user.id,
    });

    resModel.msg = "Reservation booked successfully!";
    resModel.status = 200;
    resModel.data = reservation;
    res.status(resModel.status).json(resModel);
    return;
  } catch (error) {
    resModel.msg = error.message;
    resModel.status = 500;
    resModel.data = [];
    res.status(resModel.status).json(resModel);
  }
};

export default { bookReservation };
