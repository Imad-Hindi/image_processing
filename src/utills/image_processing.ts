import sharp from 'sharp';

// Resizes an image to the specified width and height and saves it to the output path.
const resizeImage = async (
    originalPath: string,
    outputPath: string,
    width: number,
    height: number,
): Promise<void> => {
    await sharp(originalPath).resize(width, height).toFile(outputPath);
};

export default {
    resizeImage,
};
