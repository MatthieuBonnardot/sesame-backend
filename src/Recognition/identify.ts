import env from '../config/config';
import AzureFetch from './index';

const identify = async (faceId: string) => {
  try {
    const faceArr = [];
    faceArr.push(faceId);
    console.log(faceArr);
    return AzureFetch(
      'https://westeurope.api.cognitive.microsoft.com/face/v1.0/identify',
      {
        method: 'POST',
        body: JSON.stringify({
          personGroupId: env.azure.group_name,
          faceIds: faceArr,
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
