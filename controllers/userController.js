const User = require('../models/User');

const index = (req, res, next) => {
    var users = {};
    User.find()
    .then((response) => {
        for (let i = 0; i < response.length; i++) {
            users[i] = response[i].email;
        }
        res.json({users});
    })
    .catch((err) => {
        res.json({message: 'An error occured'});
    })
}

module.exports = {
    index
}
