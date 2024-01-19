import { Router } from "express";
import Auth from "../middleware/auth.middleware.js";
import cityController from "../controller/city.controller.js";

const cityRouter = Router();

cityRouter.post("/add", cityController.addCity);
cityRouter.get("/get", cityController.getCities);

export default cityRouter;
