/* eslint-disable import/no-extraneous-dependencies */
import { connect } from 'mongoose';
import env from '../../config/config';


const MongoConnection = async () => {
  await connect(env.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) console.error(err);
    console.log('success');
  });
};

export default MongoConnection;
