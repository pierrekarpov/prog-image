import express from 'express';
import ImageController from './controllers/ImageController';

const router = express.Router();

/**
 * Map routes to controller methods
 */

// Image
router.post('/image/upload', ImageController.uploadImages);
router.get('/image/:uuid', ImageController.get);

export default router;
