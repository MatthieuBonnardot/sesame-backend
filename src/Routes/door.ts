import express from 'express';
import * as doorController from '../Controllers/Door/door.controller';

const door = express.Router();

door.get('/list', doorController.getDoors);
door.post('/create', doorController.createDoor);
door.put('/update/:id', doorController.updateDoor);
door.delete('/delete/:id', doorController.deleteDoor);

export default door;
