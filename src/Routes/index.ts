import express from 'express';
import statusRoutes from './status';
import doorRoutes from './door';
import groupRoutes from './group';
import userRoutes from './user';
import azureRoutes from './azure';

const router = express.Router();

router.use('/status', statusRoutes);
router.use('/door', doorRoutes);
router.use('/group', groupRoutes);
router.use('/user', userRoutes);
router.use('/azure', azureRoutes);

export default router;
