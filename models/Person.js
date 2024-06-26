const mongoose = require('mongoose')
//bcrypt
const bcrypt = require('bcrypt')
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work:{
        type: String,
        enum : ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


//hashing the password
personSchema.pre('save', async function(next){
    const person = this;

    //hash the password only if it has been modified(or it new)
    if(!person.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(person.password, salt)
        person.password = hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch =  await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        
    }
}

//created a person schema
const Person = mongoose.model('Person', personSchema)
module.exports = Person