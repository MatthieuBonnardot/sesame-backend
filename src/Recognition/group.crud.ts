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
    return AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/train`,
      {
        method: 'POST',
        body: '{body}',
        headers: {
          'Content-Type': 'application/json',
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
    return AzureFetch(
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

export {
  deletePersonsGroup,
  trainPersonsGroup,
  getTrainingStatus,
};
