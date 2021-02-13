/* eslint-disable import/no-extraneous-dependencies */
import { connect } from 'mongoose';
import pino from 'pino';
import env from '../../config/config';

const logger = pino({
  prettyPrint: true,
});

const { test } = env.mongo;

const MongoConnection = async () => {
  await connect(
    test,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    },
    (err) => {
      if (err) logger.error(err);
      logger.info('Connected to Mongo DB');
    },
  );
};

export default MongoConnection;
