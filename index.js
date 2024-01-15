import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./db/db.config.js";
import authRouter from "./router/auth.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
