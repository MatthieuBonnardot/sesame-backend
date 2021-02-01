const db = require('../../Models/Sequelize/index.models');

async function SQLconnection() {
  try {
    await db.sequelize.sync({
      force: true,
    });
  } catch (error) {
    console.log('error :>> ', error); // eslint-disable-line no-console
  }
}

export default SQLconnection;
