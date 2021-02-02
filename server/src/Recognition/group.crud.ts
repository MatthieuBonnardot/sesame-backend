/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import AzureFetch from './index';

const logger = pino({
  prettyPrint: true,
});

const deletePersonsGroup: Function = async () => {
  try {
    AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${process.env.AZURE_PERSONS_GROUP_ID}`,
      {
        method: 'DELETE',
        headers: {
          'Ocp-Apim-Subscription-Key': `${process.env.AZURE_KEY}`,
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
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${process.env.AZURE_PERSONS_GROUP_ID}/train`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': `${process.env.AZURE_KEY}`,
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
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${process.env.AZURE_PERSONS_GROUP_ID}/training`,
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': `${process.env.AZURE_KEY}`,
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
