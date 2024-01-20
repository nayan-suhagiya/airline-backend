import { Sequelize } from "sequelize";
import sequelize from "../db/db.config.js";
import Flight from "./flight.model.js";
import Reservation from "./reservation.model.js";
import User from "./user.model.js";

const Passenger = sequelize.define("passenger", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  flightID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passportNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  visaNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      is: /^\d{10}$/i,
    },
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reservationID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  userID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

Passenger.belongsTo(Flight, { foreignKey: "flightID", targetKey: "id" });
Passenger.belongsTo(Reservation, {
  foreignKey: "reservationID",
  targetKey: "id",
});
Passenger.belongsTo(User, { foreignKey: "userID", targetKey: "id" });

Passenger.sync();

export default Passenger;
