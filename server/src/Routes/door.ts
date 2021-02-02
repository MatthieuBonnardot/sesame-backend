import express from 'express';
import * as doorController from '../Controllers/Door/door.controller';

const door = express.Router();

door.get('/list', doorController.getDoors);
door.post('/create', doorController.createDoor);
door.delete('/delete', doorController.deleteDoor);

export default door;
