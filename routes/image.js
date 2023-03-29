const Router = require('express');
const router = new Router();
const imageController = require('../controllers/image');
const multer = require('multer');

const imageUpload = multer({
  dest: 'images',
});

router.post('/image', imageUpload.single('image'), imageController.createImage);
router.get('/image/:filename', imageController.getImage);


module.exports = router;
