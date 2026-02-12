const jwt = require('jsonwebtoken')


function generateToken(user){
    const payload={
        userId: user._id
    }
    return jwt.sign(payload,process.env.secret)
}

module.exports = {generateToken}