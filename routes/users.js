const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/users', authenticate, userController.index)

module.exports = router;