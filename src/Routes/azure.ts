import express from 'express';
import * as azureController from '../Controllers/Recognition/user.recognition';

const azure = express.Router();

azure.get('/register/:code', azureController.verifyUserStatus);
azure.put('/registerUser/:UID', azureController.addFaceMappings);
azure.get('/identify/:DID/:faceID', azureController.identifyUser);

export default azure;
