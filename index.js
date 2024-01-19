import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./db/db.config.js";
import authRouter from "./router/auth.routes.js";
import cityRouter from "./router/city.routes.js";
import Auth from "./middleware/auth.middleware.js";
import flightRouter from "./router/flight.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/city", Auth, cityRouter);
app.use("/api/flight", Auth, flightRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
