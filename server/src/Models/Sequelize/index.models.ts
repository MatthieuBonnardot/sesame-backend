/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('sesame-test', 'aligato1', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const db: any = {};

const allFiles = fs.readdirSync(__dirname);
const filteredFiles = allFiles.filter((file: string) => file.indexOf('.') !== 0 && file !== 'index.model.ts' && file.slice(-3) === '.ts');

filteredFiles.forEach((file: any) => {
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

export default db;
