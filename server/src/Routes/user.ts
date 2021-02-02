import express from 'express';
import * as userController from '../Controllers/User/user.controller';

const router = express.Router();

router.get('/list', userController.getUsers);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.post('/create', userController.createUser);

export default router;
