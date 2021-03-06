const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    }
    catch (err) {
        res.json({
            message: 'Authentication failed'
        });
    }
}

module.exports = authenticate;
