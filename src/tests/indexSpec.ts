import supertest from 'supertest';
import app from '../index';
import e from 'express';


const request = supertest(app);

describe("1) Test image resizing functionality\n", () => {
  it("1- request get endpoint with filename=encenadaport and width=200 and height=200", async () => {
    const response = await request.get("/images?filename=encenadaport&width=200&height=200");
    expect(response.status).toBe(200);
  });
  it("2- verify the resized image exists", async () => {
    const response = await request.get("/images?filename=encenadaport&width=300&height=300");
    const resizedImagePath = `./images/thumb/encenadaport_thumb_300x300.jpg`;
    const fs = require('fs');
    expect(fs.existsSync(resizedImagePath)).toBe(true);
  });
  it("3- verify the the endpoint do not create the image if it already exists", async () => {
    //same request in previous test to create the image.
    const response = await request.get("/images?filename=encenadaport&width=300&height=300");
    expect(response.status).toBe(304);
  });
});

describe("2) Test image resizing negative scenarios\n", () => {
  it("1- request get endpoint with image not exists", async () => {
    const response = await request.get("/images?filename=notexistent&width=200&height=200");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Original image not found');
  });
  it("2- request get endpoint with missing filename", async () => {
    const response = await request.get("/images?width=200&height=200");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing required query parameter: filename');
  });
  it("3- request get endpoint with missing width and height", async () => {
    const response = await request.get("/images?filename=encenadaport");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Missing required query parameters: width and height');
  });
  it("4- request get endpoint with string values for width and height", async () => {
    const response = await request.get("/images?filename=encenadaport&width=abc&height=def");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Width and height must be positive integers');
  });
  it("5- request get endpoint with negative values for width and height", async () => {
    const response = await request.get("/images?filename=encenadaport&width=-100&height=-100");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Width and height must be positive integers');
  });
});
