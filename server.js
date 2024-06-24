const express = require('express')
const app = express()
const db = require('./db')

const person = require('./models/Person')
const MenuItem = require('./models/MenuItem')


const bodyParser = require('body-parser');
app.use(bodyParser.json());     //req.body


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/chicken', (req, res) => {
    var chicken={
        age:1,
        quantity:2,
        name:'hen'
    } 
    res.send(chicken)
})

// app.post('/chicken', (req, res) => {
//     var chicken = {
//         age: Number,
//         quantity: Number,
//         name: String
//     }

//     res.send(chicken)


// })


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
app.post('/person', async(req, res) => {
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
app.get('/person', async(req, res) => {
    try {
        const response = await person.find()
        console.log('Data Fetched');
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

    





app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})