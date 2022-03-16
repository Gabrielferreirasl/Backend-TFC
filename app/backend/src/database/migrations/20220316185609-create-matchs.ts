'use strict';

// import { Sequelize } from "sequelize";
import { DataTypes, QueryInterface,  } from "sequelize/types";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      home_team: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clubs',
          key: 'id'
        }
      },
      away_team: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clubs',
          key: 'id'
        }
      },
      home_team_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      away_team_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      in_progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Matchs');
  }
};