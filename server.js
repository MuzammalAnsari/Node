const express = require('express')
const app = express()

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



app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})