import {
  BuildOptions, DataTypes, Model, Sequelize,
} from 'sequelize';
import db from './index.models';
import { SQL_HOST, SQL_PORT, SQL_NAME } from '../../../../config';

export default class Door extends Model {
  public did!: number;

  public door_name!: string;

  public endpoint: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const sequelize = new Sequelize(`jdbc:postgresql://${SQL_HOST}:${SQL_PORT}/${SQL_NAME}`);

Door.init({
  did: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  door_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  endpoint: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'groups',
  sequelize,
});

Door.sync({ alter: true });
