/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import AzureFetch from './index';
import env from '../config/config';

const logger = pino({
  prettyPrint: true,
});

const deletePersonsGroup: Function = async () => {
  try {
    AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}`,
      {
        method: 'DELETE',
        headers: {
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );
  } catch (error) {
    logger.error(error);
  }
};

const trainPersonsGroup: Function = async () => {
  try {
    AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/train`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );
  } catch (error) {
    logger.error(error);
  }
};

const getTrainingStatus: Function = async () => {
  try {
    AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/training`,
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  deletePersonsGroup,
  trainPersonsGroup,
  getTrainingStatus,
};
