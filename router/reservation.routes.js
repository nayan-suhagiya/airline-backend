import { Router } from "express";
import reservationController from "../controller/reservation.controller.js";

const reservationRouter = Router();

reservationRouter.post("/add", reservationController.bookReservation);

export default reservationRouter;
