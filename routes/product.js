const Router = require('express');
const router = new Router();
const productController = require('../controllers/product');

router.post('/products', productController.createProduct);
router.get('/products', productController.getProduct);


module.exports = router;
