import express from 'express';
import * as userController from '../Controllers/User/user.controller';

const users = express.Router();

users.get('/list', userController.getUsers);
users.put('/update/:id', userController.updateUser);
users.delete('/delete/:id', userController.deleteUser);
users.post('/create', userController.createUser);

export default users;
