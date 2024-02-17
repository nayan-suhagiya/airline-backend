import { Router } from "express";
import flightController from "../controller/flight.controller.js";

const flightRouter = Router();

flightRouter.post("/add", flightController.addFlight);
flightRouter.get("/get-all", flightController.getAllFlights);
flightRouter.put("/edit/:id", flightController.editFlight);
flightRouter.delete("/delete/:id", flightController.deleteFlight);

export default flightRouter;
