/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import AzureFetch from './index';
import env from '../config/config';

const logger = pino({
  prettyPrint: true,
});

const createPerson: Function = async (name: string): Promise<Object> => {
  try {
    return await AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/persons`,
      {
        method: 'POST',
        body: {
          name,
        },
        headers: {
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );
  } catch (error) {
    logger.error(error.message);
  }
};

const addFace: Function = async (
  personId: string,
  octetStream: ArrayBuffer,
) => {
  try {
    AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/persons/${personId}/persistedFaces?detectionModel=detection_03`,
      {
        method: 'POST',
        body: {
          octetStream,
        },
        headers: {
          'content-type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );
  } catch (error) {
    logger.error(error.message);
  }
};

const getFacesPerPerson: Function = async (personId: string): Promise<Object> => {
  try {
    return await AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/persons/${personId}`,
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );
  } catch (error) {
    logger.error(error.message);
  }
};

const deletePerson: Function = async (personId: string) => {
  try {
    AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${env.azure.group_name}/persons/${personId}`,
      {
        method: 'DELETE',
        headers: {
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  createPerson,
  addFace,
  getFacesPerPerson,
  deletePerson,
};
