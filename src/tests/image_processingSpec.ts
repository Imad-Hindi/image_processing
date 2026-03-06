import * as fs from 'fs';
import image_processing from '../utills/image_processing';

describe('1) Positive scenarios: Test resizeImage function in image_processing utills\n', () => {
    it('* resize image with width=200 and height=200', async () => {
        // resize image using the function directly to test it without depending on the endpoint.
        const originalPath: string = './images/origin/encenadaport.jpg';
        const outputPath: string =
            './images/thumb/encenadaport_thumb_200x200.jpg';
        const width: number = 200;
        const height: number = 200;
        await image_processing.resizeImage(
            originalPath,
            outputPath,
            width,
            height,
        );
        expect(fs.existsSync(outputPath)).toBe(true);
    });
});

describe('2) Negative scenarios: Test resizeImage function in image_processing utills\n', () => {
    it('* resize non-existent original image', async () => {
        const originalPath: string = './images/origin/nonexistent.jpg';
        const outputPath: string =
            './images/thumb/nonexistent_thumb_200x200.jpg';
        const width: number = 200;
        const height: number = 200;
        await expectAsync(
            image_processing.resizeImage(
                originalPath,
                outputPath,
                width,
                height,
            ),
        ).toBeRejectedWithError(`Input file is missing: ${originalPath}`);

        // Ensure the output file was not created
        expect(fs.existsSync(outputPath)).toBe(false);
    });
});
