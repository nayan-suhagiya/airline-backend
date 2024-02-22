import { Sequelize } from "sequelize";
import sequelize from "../db/db.config.js";
import Flight from "./flight.model.js";
import City from "./city.model.js";
import User from "./user.model.js";

const Reservation = sequelize.define("reservation", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  flightID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  journeyDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  userID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

Reservation.belongsTo(Flight, { foreignKey: "flightID", targetKey: "id" });
Reservation.belongsTo(City, { foreignKey: "departureID", targetKey: "id" });
Reservation.belongsTo(City, { foreignKey: "destinationID", targetKey: "id" });
Reservation.belongsTo(User, { foreignKey: "userID", targetKey: "id" });

Reservation.sync();

export default Reservation;
