import express from 'express';
import file_utills from '../../utills/file_utills';
import image_processing from '../../utills/image_processing';
import path from 'path';

const routes = express.Router();

routes.get('/', async (req, res) => {
    const filename = req.query.filename as string;
    const widthStr = req.query.width as string;
    const heightStr = req.query.height as string;

    // Validate query parameters
    if (!filename) {
        return res
            .status(400)
            .json({ error: 'Missing required query parameter: filename' });
    }
    if (!widthStr || !heightStr) {
        return res.status(400).json({
            error: 'Missing required query parameters: width and height',
        });
    }

    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);
    // Validate width and height
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        return res
            .status(400)
            .json({ error: 'Width and height must be positive integers' });
    }

    const originalImagePath = path.join(
        __dirname,
        `./../../../images/origin/${filename}.jpg`,
    );
    const thumbPath = path.join(
        __dirname,
        `./../../../images/thumb/${filename}_thumb_${width}x${height}.jpg`,
    );

    // Check if original image exists
    if (!(await file_utills.fileExists(originalImagePath))) {
        return res.status(404).json({ error: 'Original image not found' });
    }

    // Check if thumbnail already exists
    if (await file_utills.fileExists(thumbPath)) {
        return res.status(304).send(); //I searched status code when the file already exists and I found it = 304.
    }

    // Resize the image and save it to the thumb directory
    try {
        await image_processing.resizeImage(
            originalImagePath,
            thumbPath,
            width,
            height,
        );
        return res.status(200).sendFile(thumbPath);
    } catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ error: 'Error processing image' });
    }
});

export default routes;
