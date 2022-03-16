import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matchs from './matchs';

'use strict';
export default class Clubs extends Model {
  public id: number;
  public club_name: string;
  };

  Clubs.init({
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize: db,
    modelName: 'Clubs',
    timestamps: false,
  });

  Clubs.hasMany(Matchs)