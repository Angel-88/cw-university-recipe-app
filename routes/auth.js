const express = require('express');
const router = express.Router();

const controllerRegister = require('../controllers/register');
const controllerLogin = require('../controllers/login');

router.post('/register', controllerRegister.register); //POST request to register the user
router.post('/login', controllerLogin.login); // POST request to log in the user

module.exports = router;
