import { Model, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './clubs'

'use strict';
export default class Matchs extends Model {
  public id: number;
  public home_team: number;
  public home_team_goals: number;
  public away_team: number;
  public away_team_goals: number;
  in_progress: number;
  };

  Matchs.init({
    home_team: DataTypes.NUMBER,
    home_team_goals: DataTypes.NUMBER,
    away_team: DataTypes.NUMBER,
    away_team_goals: DataTypes.NUMBER,
    in_progress: DataTypes.NUMBER,
  }, {
    sequelize: db,
    modelName: 'matchs',
    timestamps: false,
  });

  Matchs.belongsTo(Clubs, { foreignKey: 'home_team', as: 'homeTeam' });
  Matchs.belongsTo(Clubs, { foreignKey: 'away_team', as: 'awayTeam' });