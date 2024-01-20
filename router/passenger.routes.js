import { Router } from "express";
import passengerController from "../controller/passenger.controller.js";

const passengerRouter = Router();

passengerRouter.post("/add", passengerController.addPassenger);
passengerRouter.get("/:reservationID", passengerController.getPassenger);

export default passengerRouter;
