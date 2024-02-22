import City from "./city.model.js";
import { Sequelize } from "sequelize";
import sequelize from "../db/db.config.js";

const Flight = sequelize.define("flight", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  flightNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  journeyDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  departureID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  destinationID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  departureTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  arrivalTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  totalCapacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  classType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  baseFare: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Flight.belongsTo(City, {
  foreignKey: "departureID",
  as: "departureCity",
  targetKey: "id",
});
Flight.belongsTo(City, {
  foreignKey: "destinationID",
  as: "destinationCity",
  targetKey: "id",
});

Flight.sync();

export default Flight;
