import express from 'express';

const router = express.Router();

router.get('/register/:code');
router.put('/register/images/:UID');
router.get('/identify/:faceID');

export default router;
