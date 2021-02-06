import env from '../config/config';
import AzureFetch from './index';

const identify = async (faceId: string) => {
  try {
    return AzureFetch(
      `https://${env.azure.location}.api.cognitive.microsoft.com/face/v1.0/identify`,
      {
        method: 'POST',
        body: JSON.stringify({
          personGroupId: env.azure.group_name,
          faceIds: [faceId],
          maxNumOfCandidatesReturned: 1,
          confidenceThreshold: 0.6,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': `${env.azure.key}`,
        },
      },
    );
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

export default identify;
