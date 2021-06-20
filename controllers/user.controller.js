const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signin = async (req, res) => {
    if (!req.body.username) {
        return res.status(400).send({
            code: "P400",
            message: "Field username cannot be empty"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            code: "P400",
            message: "Field password cannot be empty"
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        adminRole: req.body.adminRole
    });

    user.save()
        .then(userData => {
            res.status(201).send({
                code: "A201",
                message: "User succesfully created and stored in database !",
                userData
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating user"
            })
        })

};

exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user == null) {
        return res.status(404).send({
            message: "User not found"
        })
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken(removePasswordField(user))
            res.send({ acessToken: accessToken })
        } else {
            res.send({ message: 'User not allowed' })
        }
    } catch {
        res.status(500).send()
    }
};

exports.getUsers = (req, res) => {
    User.find()
        .then(usersData => {
            res.send({
                usersData
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriving registered users"
        });
    });
}


function generateAccessToken (user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m'})
}

function removePasswordField(user) {
    user.password = undefined
    return user;
}



