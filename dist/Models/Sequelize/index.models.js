"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const sequelize = new Sequelize('sesame-test', 'aligato1', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});
const db = {};
const allFiles = fs.readdirSync(__dirname);
const filteredFiles = allFiles.filter((file) => file.indexOf('.') !== 0 && file !== 'index.model.ts' && file.slice(-3) === '.ts');
filteredFiles.forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
exports.default = db;
//# sourceMappingURL=index.models.js.map