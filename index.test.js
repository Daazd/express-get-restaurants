const express = require("express");
const request = require("supertest");
const app = require("./src/app");
jest.mock("./db/connection");

async function setupTestData() {
    const Restaurant = require("./models/Restaurant");
    await Restaurant.create({ name: "Restaurant 1", location: "Location 1" });
    await Restaurant.create({ name: "Restaurant 2", location: "Location 2" });
    await Restaurant.create({ name: "Restaurant 3", location: "Location 3" });
}

describe('restaurants', () => {
    beforeEach(async () => {
        await setupTestData();
    });

    it('GET /restaurants', async () => {
        const response = await request(app).get("/restaurants");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });

    it('GET /restaurants/:id', async () => {
        const response = await request(app).get("/restaurants/1");
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Restaurant 1");
    });

    it('GET /restaurants/:id - restaurant not found', async () => {
        const response = await request(app).get("/restaurants/100");
        expect(response.status).toBe(404);
    });

    it('PUT /restaurants/:id', async () => {
        const response = await request(app).put("/restaurants/1").send({ name: "New Name" });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("New Name");
    });

    it('PUT /restaurants/:id - restaurant not found', async () => {
        const response = await request(app).put("/restaurants/100").send({ name: "New Name" });
        expect(response.status).toBe(404);
    });

    it('DELETE /restaurants/:id', async () => {
        const response = await request(app).delete("/restaurants/1");
        expect(response.status).toBe(204);
    });

    it('DELETE /restaurants/:id - restaurant not found', async () => {
        const response = await request(app).delete("/restaurants/100");
        expect(response.status).toBe(404);
    });

    it('POST /restaurants', async () => {
        const response = await request(app).post("/restaurants").send({ name: "New Restaurant", location: "New Location" });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("New Restaurant");
        expect(response.body.location).toBe("New Location");
    });

    it('POST /restaurants - missing name', async () => {
        const response = await request(app).post("/restaurants").send({ location: "New Location" });
        expect(response.status).toBe(400);
    });

    it('POST /restaurants - missing location', async () => {
        const response = await request(app).post("/restaurants").send({ name: "New Restaurant" });
        expect(response.status).toBe(400);
    });

    it('POST /restaurants - missing name and location', async () => {
        const response = await request(app).post("/restaurants").send({});
        expect(response.status).toBe(400);
    });
});