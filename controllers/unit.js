const client = require('../configs/database');

class UnitController {
  async createUnit (req, res) {
    const { name, abbreviation } = req.body;
    const newUnit = await client.query(`INSERT INTO units (name, abbreviation)
                                       values ($1, $2) RETURNING *`, [name, abbreviation]);

    res.json(newUnit.rows[0]);
  }

  async getUnit (req, res) {
    const units = await client.query('SELECT id "id", name "name", abbreviation "abbreviation" FROM public.units');

    res.json(units.rows);
  }
}

module.exports = new UnitController();
