import sequelize from "../db/db.config.js";
import { Sequelize } from "sequelize";

const City = sequelize.define("city", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  cityName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

City.sync();

export default City;
