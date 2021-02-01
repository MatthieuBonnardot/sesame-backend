import {
  BuildOptions, DataTypes, Model, Sequelize,
} from 'sequelize';
import db from './index.models';
import { SQL_HOST, SQL_PORT, SQL_NAME } from '../../../../config';

export default class Group extends Model {
  public gid!: number;

  public group_name!: string;

  public description: string;

  public access_from_hour: number;

  public access_to_hour: number;

  public group_image: HTMLImageElement;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const sequelize = new Sequelize(`jdbc:postgresql://${SQL_HOST}:${SQL_PORT}/${SQL_NAME}`);

Group.init({
  gid: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  group_name: {
    type: DataTypes.STRING(50),
  },
  description: {
    type: DataTypes.STRING(500),
  },
  access_from_hour: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  access_to_hour: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  group_image: {
    type: DataTypes.BLOB,
  },
}, {
  tableName: 'group',
  sequelize,
});

Group.sync({ alter: true });
