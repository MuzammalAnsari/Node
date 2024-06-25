const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

//POST route to MenuItem
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);

    //save the new MenuItem to database
    const response = await newMenuItem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET method to get the MenuItem
router.get("/", async (req, res) => {
  try {
    const Response = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(Response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET method to get the particular Menu Item through params
router.get("/:taste", async (req, res) => {
  try {
    const itemTaste = req.params.taste;
    if (itemTaste == "sweet" || itemTaste == "sour" || itemTaste == "salty") {
      const response = await MenuItem.find({ taste: itemTaste });
      console.log("taste item found");
      res.status(200).json(response);
    } else {
      res.status(500).json({ error: "Invalid taste" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
