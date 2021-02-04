import express from 'express';
import * as groupController from '../Controllers/Group/group.controller';

const group = express.Router();

group.get('/list', groupController.getGroups);
group.post('/create', groupController.createGroup);
group.delete('/delete/:id', groupController.deleteGroup);
group.put('/update/:id', groupController.updateGroup);

export default group;
