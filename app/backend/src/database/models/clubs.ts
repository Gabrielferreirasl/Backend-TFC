import { Model, DataTypes } from 'sequelize';
import db from '.';

class Clubs extends Model {
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'clubs',
  timestamps: false,
});

export default Clubs;
