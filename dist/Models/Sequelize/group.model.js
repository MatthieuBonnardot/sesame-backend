"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
const user_model_1 = __importDefault(require("./user.model"));
class Group extends sequelize_1.Model {
}
exports.default = Group;
const sequelize = new sequelize_1.Sequelize(`jdbc:postgresql://${config_1.SQL_HOST}:${config_1.SQL_PORT}/${config_1.SQL_NAME}`);
Group.init({
    gid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    group_name: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    description: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    access_from_hour: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    access_to_hour: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    group_image: {
        type: sequelize_1.DataTypes.BLOB,
    },
}, {
    tableName: 'group',
    sequelize,
});
Group.hasMany(user_model_1.default, { foreignKey: 'gid' });
Group.sync({ alter: true }).then(() => console.log('group table created'));
//# sourceMappingURL=group.model.js.map