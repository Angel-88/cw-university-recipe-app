const client = require('../configs/database');

class CategoryController {
  async createCategory (req, res) {
    const { name } = req.body;
    const newCategory = await client.query(`INSERT INTO categories (name)
                                       values ($1) RETURNING *`, [name]);

    res.json(newCategory.rows[0]);
  }

  async getCategory (req, res) {
    const categories = await client.query('SELECT id "id", name "name" FROM public.categories');

    res.json(categories.rows);
  }
}

module.exports = new CategoryController();
