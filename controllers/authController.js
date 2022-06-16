const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            });
        }
        let user = new User({
            email: req.body.email,
            password: hashedPass
        })
        user.save()
        .then((user) => {
            res.json({
                message: 'User created successfully',
            });
        })
        .catch((error) => {
            res.json({
                message: 'An error occured',
            });
        })
    });
}

const login = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email})
    .then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        message: err
                    });
                }
                if (result) {
                    let token = jwt.sign({email: user.email}, 'secret');
                    res.json({
                        message: 'User logged in successfully',
                        token: token
                    });
                } else {
                    res.json({
                        message: 'Invalid password'
                    });
                }
            });
        } else {
            res.json({
                message: 'User not found'
            });
        }
    }
    ).catch((error) => {
        res.json({
            message: 'An error occured'
        });
    })
}

module.exports = {
    register, login
}
