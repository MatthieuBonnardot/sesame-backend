import {
  BuildOptions, DataTypes, Model, Sequelize,
} from 'sequelize';
import Group from './group.model';
import Door from './door.model';

export default class Permissions extends Model {
  private groupId: number;

  private doorId: number;
}

Permissions.init({
  groupId: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  doorId: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
}, {
  tableName: 'permissions',
});
