const jwt = require('jsonwebtoken')

//jwt auth middleware
const jwtAuthMiddleware = (req, res, next) => {

    //first check the request headers has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error : 'Token not found'})


    //extract the jwt token from request header
    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({error : 'Unauthorized'})
    
    try {
        //verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //attach user info to the req obj
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error : 'Invalid Token'})
        
    }
}

//function to generate token using user data
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 3000})
}

module.exports = {jwtAuthMiddleware, generateToken}