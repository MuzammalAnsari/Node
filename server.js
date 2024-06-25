const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()



const bodyParser = require('body-parser');
app.use(bodyParser.json());     //req.body

const PORT = process.env.PORT || 3000


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


const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//import the menuItem route file
const menuItemRoutes = require('./routes/menuItemRoutes')
app.use('/menu', menuItemRoutes)




app.listen(PORT, ()=>{
    console.log('server is running on port 3000')
})