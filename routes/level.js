const Router = require('express');
const router = new Router();
const unitController = require('../controllers/level');

router.post('/levels', unitController.createLevel);
router.get('/levels', unitController.getLevel);


module.exports = router;
