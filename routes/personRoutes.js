const express = require("express");
const router = express.Router();
const person = require('../models/Person')


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
router.post('/', async(req, res) => {
    try {
        const data = req.body
        const newPerson = new person(data)
        
        //save the new person to database
        const response = await newPerson.save()
        console.log('data saved')
        res.status(200).json(response)
    
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
        
    })
    
    //GET method to get the person
    router.get('/', async(req, res) => {
        try {
            const response = await person.find()
            console.log('Data Fetched');
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    })
    
    

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
router.put("/signup", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const response = await person.findByIdAndUpdate(id, data,{
        new: true, //return the updated document
        runValidators: true  // run mongoose validation
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
    const id = req.params.id
    const response = await person.findByIdAndDelete(id)

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("data deleted");
    res.status(200).json({message : "person deleted successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;