import sharp from 'sharp';

const resizeImage = async (
    originalPath: string,
    outputPath: string,
    width: number,
    height: number,
) => {
    await sharp(originalPath).resize(width, height).toFile(outputPath);
};

export default {
    resizeImage,
};
