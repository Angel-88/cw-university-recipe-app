 const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/user');

router.get('/:id', controllerUser.user);

module.exports = router;
