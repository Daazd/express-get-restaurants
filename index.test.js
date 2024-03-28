const express = require("express");
const request = require("supertest");
const app = require("./src/app");


describe('restaurants', () => {

    it('GET /restaurants', async () => {
        const response = await request(app).get("/restaurants");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });

    it('GET /restaurants/:id', async () => {
        const response = await request(app).get("/restaurants/1");
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("AppleBees");
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

    it('POST /restaurants - fails when name is empty', async () => {
        const newRestaurant = { name: "", location: "New Location", cuisine: "New Cuisine" };
        const response = await request(app).post("/restaurants").send(newRestaurant);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();

    });

    it('POST /restaurants - fails when location is empty', async () => {
        const newRestaurant = { name: "New Restaurant", location: "", cuisine: "New Cuisine" };
        const response = await request(app).post("/restaurants").send(newRestaurant);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('POST /restaurants - fails when cuisine is empty', async () => {
        const newRestaurant = { name: "New Restaurant", location: "New Location", cuisine: "" };
        const response = await request(app).post("/restaurants").send(newRestaurant);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });


});