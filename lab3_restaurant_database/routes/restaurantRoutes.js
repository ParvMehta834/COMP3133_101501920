const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();


// ✅ 4. Get ALL restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


// ✅ 5. Get restaurants by cuisine
router.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      cuisine: req.params.cuisine
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


// ✅ 6. Get selected fields + sorting
router.get("/restaurants/sort", async (req, res) => {
  try {

    let sortOrder = req.query.sortBy === "DESC" ? -1 : 1;

    const restaurants = await Restaurant.find(
      {},
      {
        cuisine: 1,
        name: 1,
        city: 1,
        restaurant_id: 1
      }
    ).sort({ restaurant_id: sortOrder });

    res.json(restaurants);

  } catch (error) {
    res.status(500).json(error.message);
  }
});


// ✅ 7. Delicatessen AND city != Brooklyn
router.get("/restaurants/Delicatessen", async (req, res) => {
  try {

    const restaurants = await Restaurant.find(
      {
        cuisine: "Delicatessen",
        city: { $ne: "Brooklyn" }
      },
      {
        _id: 0,
        cuisine: 1,
        name: 1,
        city: 1
      }
    ).sort({ name: 1 });

    res.json(restaurants);

  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
