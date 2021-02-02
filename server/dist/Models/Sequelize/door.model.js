"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
class Door extends sequelize_1.Model {
}
exports.default = Door;
const sequelize = new sequelize_1.Sequelize(`jdbc:postgresql://${config_1.SQL_HOST}:${config_1.SQL_PORT}/${config_1.SQL_NAME}`);
Door.init({
    did: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    door_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    endpoint: {
        type: sequelize_1.DataTypes.STRING(50),
    },
}, {
    tableName: 'groups',
    sequelize,
});
Door.sync({ alter: true }).then(() => console.log('door table created'));
//# sourceMappingURL=door.model.js.map