const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ error: "Restaurant not found" });
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (restaurant) {
            await restaurant.update(req.body);
            res.json(restaurant);
        } else {
            res.status(404).json({ error: "Restaurant not found" });
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (restaurant) {
            await restaurant.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: "Restaurant not found" });
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





module.exports = app;