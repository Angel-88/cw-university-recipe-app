const client = require('../configs/database');

class ProductController {
  async createProduct (req, res) {
    const { name } = req.body;
    const newProduct = await client.query(`INSERT INTO products (name)
                                       values ($1) RETURNING *`, [name]);

    res.json(newProduct.rows[0]);
  }

  async getProduct (req, res) {
    const products = await client.query('SELECT id "id", name "name" FROM public.products');

    res.json(products.rows);
  }
}

module.exports = new ProductController();
