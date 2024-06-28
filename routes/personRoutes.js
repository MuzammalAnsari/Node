const express = require("express");
const router = express.Router();
const person = require("../models/Person");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

//1st method to define lenght model
// app.post('/person', (req, res) => {
//     const person = new person({
//         name: req.body.name,
//         age: req.body.age,
//         work: req.body.work,
//         mobile: req.body.mobile,
//         email: req.body.email,
//         address: req.body.address,
//         salary: req.body.salary
//     })
//     person.save()
// })

//2nd method to define
//POST route to add person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);

    //save the new person to database
    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };

    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("Token : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await person.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    //generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    
    const token = generateToken(payload)
    res.status(200).json({ token: token });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


//Profile Route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user
    console.log("userData", userData);

    const userId = userData.id;
    const user = await person.findById(userId);
    res.status(200).json({user});

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET method to get the person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const response = await person.find();
    console.log("Data Fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET method to get the particular person through params
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await person.find({ work: workType });
      console.log("work type fetched");
      res.status(200).json(response);
    } else {
      res.status(500).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error" });
  }
});

// //PUT method to add person in /person/signup
router.put("/", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const response = await person.findByIdAndUpdate(id, data, {
      new: true, //return the updated document
      runValidators: true, // run mongoose validation
    });

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE method to delete person
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await person.findByIdAndDelete(id);

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
