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

//PUT method to update Menu Item
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const response = await MenuItem.findByIdAndUpdate(id, data, {
      new: true, //return the updated document
      runValidators: true, // run mongoose validation
    });

    if (!response) {
      res.status(404).json({ error: "MenuItem not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error" });
  }
});

//DELETE method to delete Menu Item
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const response = await MenuItem.findByIdAndDelete(id)

    if (!response) {
      res.status(404).json({ error: "MenuItem not found" });
    }

    console.log("data deleted");
    res.status(200).json({message : "MenuItem deleted successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
