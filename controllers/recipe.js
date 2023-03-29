const client = require('../configs/database');

class RecipeController {
  async createRecipe (req, res) {
    const { name, description, time, user, image, level, categories, ingredients } = req.body;
    const imageName = image;
    const userId = user.id;
    const levelId = level.id

    const newRecipe = await client.query(`INSERT INTO recipes (name, description, time, user_id, level_id, image)
                                          values ('${name}', '${description}', '${time}', '${userId}',
                                                  '${levelId}', '${imageName}') RETURNING *`);
    const newRecipeResult = newRecipe.rows[0];
    const newRecipeResultId = newRecipeResult.id;

    if (categories.length) {
      for (const category of categories) {
        const categoryId = category.id;
        await client.query(`INSERT INTO recipe_categories (recipe_id, category_id)
                            values ('${newRecipeResultId}', '${categoryId}') RETURNING *`);
      }
    }

    if (ingredients.length) {
      for (const ingredient of ingredients) {
        let productId = ingredient.product.id ?? (await client.query(`INSERT INTO products (name)
                                                                      values ('${ingredient.product.name}') RETURNING *`)).rows[0].id;
        await client.query(`INSERT INTO ingredients (recipe_id, product_id, quantity, unit_id)
                            values ('${newRecipeResultId}', '${productId}', '${ingredient.quantity}',
                                    '${ingredient.unit.id}') RETURNING *`);
      }
    }

    res.json(newRecipeResult);
  }

  async getRecipes (req, res) {
    //
    // const nameQuery = ' WHERE LOWER("name") LIKE ' + (!!req.query?.name ? `'%${req.query?.name?.toLowerCase()}%'` : `'%'`);
    // const categoriesQuery = req.query?.categoryIds?.length ? `AND rv.id IN (
    //     SELECT rc.recipe_id
    //     FROM recipe_categories rc
    //     WHERE rc.category_id IN (${req.query?.categoryIds}))` : ``;
    // const ingredientsQuery = req.query?.ingredientIds?.length ? `AND r.id IN (
    //     SELECT i.recipe_id
    //     FROM ingredients i
    //     WHERE i.ingredient_id IN (${req.query?.ingredientIds}))` : ``;

    const query = `
      SELECT *
      FROM public.recipe_v as rv`;

    const recipes = await client.query(query);

    const result = recipes.rows.map(res => ({
      id: res.id,
      name: res.name,
      description: res.description,
      time: res.time,
      categories: res.categories,
      level: res.level,
      image: res.image,
      user: res.user,
      ingredients: res.ingredients,
    }));

    res.json(result);
  }

  async getRecipe (req, res) {

    const query = `
      SELECT *
      FROM public.recipe_v
      WHERE id = ${req.params['id']}
    `;
    const establishments = await client.query(query);
    const result = establishments.rows.map(res => ({
      id: res.id,
      name: res.name,
      description: res.description,
      time: res.time,
      categories: res.categories,
      level: res.level,
      image: res.image,
      user: res.user,
      ingredients: RecipeController.getIngredients(res.ingredients),
    }));

    res.json(result[0]);
  }

  static getIngredients (arr) {
    const obj = {};
    if (arr?.length) {
      arr.forEach((ingredients) => {
        const number = ingredients['dayNumber'];
        obj[[]]  = { product: ingredients['product'], quantity: ingredients['quantity'], unit: ingredients['unit']};
      });
    }

    return obj;
  }
}

module.exports = new RecipeController();
