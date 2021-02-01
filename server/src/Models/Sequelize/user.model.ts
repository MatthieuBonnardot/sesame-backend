import {
  BuildOptions, DataTypes, Model, Sequelize,
} from 'sequelize';
import db from './index.models';
import { SQL_HOST, SQL_PORT, SQL_NAME } from '../../../../config';

export default class User extends Model {
  public uid!: number;

  public aid: string;

  public gid: number;

  public registration_key: string;

  public door_key: number;

  public first_name!: string;

  public last_name!: string;

  public email!: string;

  public isActive: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const sequelize = new Sequelize(`jdbc:postgresql://${SQL_HOST}:${SQL_PORT}/${SQL_NAME}`);

User.init({
  uid: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  aid: {
    type: DataTypes.STRING(36),
  },
  gid: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  registration_key: {
    type: DataTypes.STRING(25),
  },
  door_key: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
}, {
  tableName: 'users',
  sequelize,
});

User.sync({ alter: true });
