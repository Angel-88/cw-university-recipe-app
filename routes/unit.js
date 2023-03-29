const Router = require('express');
const router = new Router();
const unitController = require('../controllers/unit');

router.post('/units', unitController.createUnit);
router.get('/units', unitController.getUnit);


module.exports = router;
