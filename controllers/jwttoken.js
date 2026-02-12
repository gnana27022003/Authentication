const jwt = require('jsonwebtoken')


function generateToken(user){
    const payload={
        userId: user.userId
    }
    return jwt.sign(payload,process.env.secret)
}
function verifyToken(token){
    try{
        const jwtoken = jwt.verify(token,process.env.secret)
        return jwtoken
    }
    catch(error){
        console.log('INVALID TOKEN')
    }
}


module.exports = {generateToken,verifyToken}