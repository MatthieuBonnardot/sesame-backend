import express from 'express';
import * as doorController from '../Controllers/Door/door.controller';

const router = express.Router();

router.get('/list', doorController.getDoors);
router.post('/create', doorController.createDoor);
router.delete('/delete', doorController.deleteDoor);

export default router;
