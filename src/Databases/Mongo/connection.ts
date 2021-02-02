/* eslint-disable import/no-extraneous-dependencies */
import { connect } from 'mongoose';
import 'dotenv/config';

const { MONGO_DB_URI_TEST } = process.env;

const MongoConnection = async () => {
  await connect(MONGO_DB_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default MongoConnection;
