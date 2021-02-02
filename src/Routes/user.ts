import express from 'express';
import * as userController from '../Controllers/User/user.controller';

const users = express.Router();

users.get('/list', userController.getUsers);
users.put('/update', userController.updateUser);
users.delete('/delete', userController.deleteUser);
users.post('/create', (req, res: express.Response) => {
  console.log('get call');
  res.json({
    message: 'success',
  });
});

// userController.createUser
export default users;
