import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./db/db.config.js";
import authRouter from "./router/auth.routes.js";
import cityRouter from "./router/city.routes.js";
import Auth from "./middleware/auth.middleware.js";

import flightRouter from "./router/flight.routes.js";
import cors from "cors";
import reservationRouter from "./router/reservation.routes.js";
import passengerRouter from "./router/passenger.routes.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/city", Auth, cityRouter);
app.use("/api/flight", Auth, flightRouter);
app.use("/api/reservation", Auth, reservationRouter);
app.use("/api/passenger", Auth, passengerRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
