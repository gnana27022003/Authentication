const jwt = require('jsonwebtoken')
const { errorMiddleware } = require('../middleware/errorMiddleware')


function generateToken(user){
    const payload={
        userId: user.userId
    }
    return jwt.sign(payload,process.env.secret)
}
function verifyToken(token){
    
       return jwt.verify(token,process.env.secret)

    
}


module.exports = {generateToken,verifyToken}