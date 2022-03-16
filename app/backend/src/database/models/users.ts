import { Model, DataTypes } from 'sequelize';
import db from '.';

'use strict';
export default class Users extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
  };

  Users.init({
    username: DataTypes.NUMBER,
    role: DataTypes.NUMBER,
    email: DataTypes.NUMBER,
    password: DataTypes.NUMBER,
  }, {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  });