import {
  BuildOptions, DataTypes, Model, Sequelize,
} from 'sequelize';
import Group from './group.model';
import Door from './door.model';

export default class Permissions {
  private groupId: number;

  private doorId: number;
}

Permissions.init({

})