import env from '../config/config';
import AzureFetch from './index';

const detect = async (octet: Buffer) => {
  try {
    // const faceArr = [];
    // faceArr.push(faceId);

    const params = 'detect?returnFaceId=true&recognitionModel=recognition_03&detectionModel=detection_02';
    console.log(octet);
    return AzureFetch(
      `https://westeurope.api.cognitive.microsoft.com/face/v1.0/${params}`,
      {
        method: 'POST',
        body: octet,
        headers: {
          'content-type': 'application/octet-stream',
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

export default detect;
