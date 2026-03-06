import express from 'express';
import images from './api/images';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from the main API !');
});

router.use('/images', images);

export default router;
