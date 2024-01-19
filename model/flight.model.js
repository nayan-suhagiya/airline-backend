import City from "./city.model.js";
import { Sequelize } from "sequelize";
import sequelize from "../db/db.config.js";

const Flight = sequelize.define("flight", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  flightName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  sourceID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  destinationID: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  arrivalTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  estimatedTravellingHour: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  classType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fare: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Flight.belongsTo(City, { foreignKey: "sourceID" });
Flight.belongsTo(City, { foreignKey: "destinationID" });

Flight.sync();

export default Flight;
