const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/category');

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getCategory);


module.exports = router;
