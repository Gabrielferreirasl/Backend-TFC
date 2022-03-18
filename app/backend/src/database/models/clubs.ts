import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matchs from './matchs';

'use strict';
export default class Clubs extends Model {
  public id: number;
  public club_name: string;
  };

  Clubs.init({
    club_name: DataTypes.STRING
  }, {
    sequelize: db,
    modelName: 'clubs',
    timestamps: false,
  });
