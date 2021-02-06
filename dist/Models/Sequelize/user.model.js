"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
const group_model_1 = __importDefault(require("./group.model"));
class User extends sequelize_1.Model {
}
exports.default = User;
const sequelize = new sequelize_1.Sequelize(`jdbc:postgresql://${config_1.SQL_HOST}:${config_1.SQL_PORT}/${config_1.SQL_NAME}`);
User.init({
    uid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    aid: {
        type: sequelize_1.DataTypes.STRING(36),
    },
    gid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    registration_key: {
        type: sequelize_1.DataTypes.STRING(25),
    },
    door_key: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    tableName: 'users',
    sequelize,
});
User.belongsTo(group_model_1.default);
User.sync({ alter: true }).then(() => console.log('user table created'));
//# sourceMappingURL=user.model.js.map