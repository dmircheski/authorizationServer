require('dotenv').config()
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

const user = new User({
    username: "Deni",
    password: "denideni"
})

const payload = removePasswordField(user)
console.log(payload)
const at = generateAccessToken(user)
console.log(at)

const verno = authenticateToken(at)
console.log(verno)


function generateAccessToken (user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
}

function removePasswordField(user) {
    delete user.password;
    return user;
}

function authenticateToken(token) {
    console.log("verno e")
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}