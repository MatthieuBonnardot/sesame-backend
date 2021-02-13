import express from 'express';
import * as azureController from '../Controllers/Recognition/user.recognition';

const azure = express.Router();

azure.get('/register/:code', azureController.verifyUserStatus);
azure.put('/register/:UID', azureController.addFaceMappings);
azure.get('/identify/:DID/:faceID', azureController.identifyUser);
azure.get('/code/:DID/:code', azureController.identifyUserWithCode);

export default azure;
