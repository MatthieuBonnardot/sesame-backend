/* eslint-disable import/no-extraneous-dependencies */
import fetch from 'node-fetch';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});

const AzureFetch: Function = async (url: string, options: Object = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error(error);
  }
};

export default AzureFetch;
