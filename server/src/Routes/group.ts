import express from 'express';
import * as groupController from '../Controllers/Group/group.controller';

const router = express.Router();

router.get('/list', groupController.getGroups);
router.post('/create', groupController.createGroup);
router.delete('/delete', groupController.deleteGroup);
router.put('/update', groupController.updateGroup);

export default router;
