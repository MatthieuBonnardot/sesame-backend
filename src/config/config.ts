/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_PORT,
  },
  azure: {
    key: process.env.AZURE_KEY,
    backup_key: process.env.AZURE_KEY2,
    group_name: process.env.AZURE_PERSONS_GROUP_ID,
    enpoint: process.env.AZURE_ENDPOINT,
    location: process.env.AZURE_LOCATION,
  },
  mongo: {
    uri: process.env.MONGO_DB_URI,
    test: process.env.MONGO_DB_URI_TEST,
  },
  postgres: {
    uri: process.env.POSTGRES_URI,
    uri_admin: process.env.POSTGRES_URI_ADMIN,
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
};

export default config;
