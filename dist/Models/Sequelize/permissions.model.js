"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Permissions extends sequelize_1.Model {
}
exports.default = Permissions;
Permissions.init({
    groupId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    doorId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
}, {
    tableName: 'permissions',
});
//# sourceMappingURL=permissions.model.js.map