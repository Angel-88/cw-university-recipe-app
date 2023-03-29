const Router = require('express');
const router = new Router();
const recipeController = require('../controllers/recipe');

router.post('/recipes', recipeController.createRecipe);
router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/:id', recipeController.getRecipe);
// router.put('/recipes/:id', recipeController.putRecipe);
// router.delete('/recipes/:id', recipeController.deleteRecipe);


module.exports = router;
