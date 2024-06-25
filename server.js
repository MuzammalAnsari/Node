const express = require('express')
const app = express()
const db = require('./db')



const bodyParser = require('body-parser');
app.use(bodyParser.json());     //req.body


app.get('/', (req, res) => {
    res.send('Welcome to our Hotel')
})

// app.get('/chicken', (req, res) => {
//     var chicken={
//         age:1,
//         quantity:2,
//         name:'hen'
//     } 
//     res.send(chicken)
// })

// app.post('/chicken', (req, res) => {
//     var chicken = {
//         age: Number,
//         quantity: Number,
//         name: String
//     }
//     res.send(chicken)
// })


//import the person route file


const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//import the menuItem route file
const menuItemRoutes = require('./routes/menuItemRoutes')
app.use('/menu', menuItemRoutes)



app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})