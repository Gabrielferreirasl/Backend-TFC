'use strict';

// import { Sequelize } from "sequelize";
import { DataTypes, QueryInterface,  } from "sequelize/types";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      club_name: {
        type: DataTypes.STRING
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Clubs');
  }
};