import { Router } from "express";
import cityController from "../controller/city.controller.js";

const cityRouter = Router();

cityRouter.post("/add", cityController.addCity);
cityRouter.get("/get", cityController.getCities);
cityRouter.put("/edit/:id", cityController.editCity);
cityRouter.delete("/delete/:id", cityController.deleteCity);

export default cityRouter;
