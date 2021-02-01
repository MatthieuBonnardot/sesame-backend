const db = require('../../Models/Sequelize/index.model');

module.exports = async () => {
  try {
    await db.sequelize.sync({
      force: true
    });
    console.log('⛳ Database synched'); // eslint-disable-line no-console

    // const { url } = await server.listen();
    // console.log(`🚀 Server ready at ${url}`); // eslint-disable-line no-console
  } catch (error) {
    console.log('error :>> ', error); // eslint-disable-line no-console
  }
};
