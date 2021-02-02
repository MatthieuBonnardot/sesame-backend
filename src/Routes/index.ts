import express from 'express';
import statusRoutes from './status';
import doorRoutes from './door';
import groupRoutes from './group';
import userRoutes from './user';
import azureRoutes from './azure';

const router = express.Router();

console.log('in router');
router.use('/status', statusRoutes);
router.use('/door', doorRoutes);
router.use('/group', groupRoutes);
router.use('/user', (req, res, next) => {
  userRoutes(req, res, next);
});
router.use('/azure', azureRoutes);

export default router;
