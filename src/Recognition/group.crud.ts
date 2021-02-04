/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import AzureFetch from './index';
import env from '../config/config';
import status from '../Routes/status';

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
    const training = await AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/train`,
      {
        method: 'POST',
        body: '',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );

    logger.info(training);
  } catch (error) {
  }
};

const getTrainingStatus: Function = async () => {
  try {
    const status = await AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/training`,
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );

    logger.info(status);
  } catch (error) {
    logger.error(error);
  }
};

export { deletePersonsGroup, trainPersonsGroup, getTrainingStatus };
