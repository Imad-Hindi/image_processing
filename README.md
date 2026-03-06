# Image Processing API

This project is an Image Processing API built with Node.js and Express. It allows users to resize images by providing the filename, width, and height as query parameters.
It is built with TypeScript and uses Sharp module for high-performance image processing.

## Features

- Resize images on-the-fly
- Caches resized images to improve performance
- Validates input parameters and handles errors gracefully
- Fully used typescript for better developer experience and reliability.

## Installation

1. Clone the repository:
    ```bash
    git clone
    ```
2. Navigate to the project directory:
    ```bash
    cd image_processing
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. Make a GET request to the `/images` endpoint with the following query parameters:
    - `filename`: The name of the image file (without extension) located in the `images/origin` directory.
    - `width`: The desired width of the resized image (positive integer).
    - `height`: The desired height of the resized image (positive integer).
      Example:
      http://localhost:3000/images?filename=encenadaport&width=200&height=200

## Testing

- The tests cover both positive and negative scenarios for the image resizing functionality.
- To run the tests, use the following command:
    ```bash
    npm test
    ```

## Project Structure

- `src/`: Contains the source code for the API.
    - `index.ts`: The main entry point of the application.
    - `routes/`: Contains the route handlers for the API.
        - `api/images.ts`: The route handler for image resizing.
    - `tests/`: Contains the test cases for the API.
        - `indexSpec.ts`: The test cases for the image resizing functionality.
    - `utills/`: Contains utilities that help in use files/images in project.
        - `file_utills.ts`: Contains helper function to deal with files.
        - `image_processing.ts`: Contains helper function to resize images.
- `images/`: Contains the original and resized images.
    - `origin/`: Contains the original images.
    - `thumb/`: Contains the resized images (thumbnails).

## Dependencies

- `express`: Web framework for Node.js.
- `sharp`: High-performance image processing library.
- `supertest`: Library for testing HTTP servers.
