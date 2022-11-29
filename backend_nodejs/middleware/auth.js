require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = async (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        return res.status(403).send("Empty token");
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_TOKEN_KEY);
         //console.log(decode);
        req.user = decode;
    } catch (error) {
        console.log(error)
    }

    return next();
}

module.exports = verifyToken;