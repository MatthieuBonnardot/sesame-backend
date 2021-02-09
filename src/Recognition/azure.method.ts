/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import fetch from 'node-fetch';
import pino from 'pino';
import env from '../config/config';

const logger = pino({
  prettyPrint: true,
});

async function AzureFetch(url: string, options: any): Promise<Object> {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error(error);
  }
}

interface AzureServiceParameters {
  faceId?: string;
  email?: string;
  octetStream?: Buffer;
  personId?: string;
}

async function azureService(
  action: string,
  subAction: string,
  params: AzureServiceParameters,
): Promise<any> {
  try {
    const url = `https://${env.azure.location}.api.cognitive.microsoft.com/face/v1.0`;
    switch (action) {
      case 'IDENTIFY':
        return AzureFetch(
          `${url}/identify`,
          {
            method: 'POST',
            body: JSON.stringify({
              personGroupId: env.azure.group_name,
              faceIds: [params.personId],
              maxNumOfCandidatesReturned: 1,
              confidenceThreshold: 0.8,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
            },
          },
        );

      case 'USER':
        switch (subAction) {
          case 'CREATE':
            return await AzureFetch(
              `${url}/persongroups/${env.azure.group_name}/persons`,
              {
                method: 'POST',
                body: JSON.stringify({
                  name: params.email,
                }),
                headers: {
                  'Content-Type': 'application/json',
                  'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
                },
              },
            );

          case 'FACE':
            return AzureFetch(
              `${url}/persongroups/${env.azure.group_name}/persons/${params.personId}/persistedFaces?detectionModel=detection_03`,
              {
                method: 'POST',
                body: params.octetStream,
                headers: {
                  'content-type': 'application/octet-stream',
                  'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
                },
              },
            );

          case 'DELETE':
            AzureFetch(
              `${url}/persongroups/${env.azure.group_name}/persons/${params.personId}`,
              {
                method: 'DELETE',
                headers: {
                  'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
                },
              },
            );
            break;

          default:
            logger.error(`Invalid SUBACTION: ${subAction} FOR USERS`);
            break;
        }
        break;

      case 'GROUP':
        switch (subAction) {
          case 'DELETE':
            await AzureFetch(
              `${url}/persongroups/${env.azure.group_name}`,
              {
                method: 'DELETE',
                headers: {
                  'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
                },
              },
            );
            break;

          case 'TRAIN':
            await AzureFetch(
              `${url}/persongroups/${env.azure.group_name}/train`,
              {
                method: 'POST',
                body: '',
                headers: {
                  'Content-Type': 'application/json',
                  'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
                },
              },
            );
            break;

          case 'STATUS':
            await AzureFetch(
              `${url}/persongroups/${env.azure.group_name}/training`,
              {
                method: 'GET',
                headers: {
                  'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
                },
              },
            );
            break;

          default:
            logger.error(`Invalid SUBACTION: ${subAction} FOR GROUP`);
            break;
        }
        break;

      default:
        logger.error(`Invalid ACTION: ${action}`);
        break;
    }
  } catch (error) {
    logger.error({
      declaration: 'ERROR: SWITCH AZURE',
      error: error.message,
    });
  }
}

export default azureService;
