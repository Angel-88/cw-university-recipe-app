const client = require('../configs/database');

class LevelController {
  async createLevel (req, res) {
    const { name } = req.body;
    const newLevel = await client.query(`INSERT INTO units (name)
                                       values ($1) RETURNING *`, [name]);

    res.json(newLevel.rows[0]);
  }

  async getLevel (req, res) {
    const levels = await client.query('SELECT id "id", name "name" FROM public.levels');

    res.json(levels.rows);
  }
}

module.exports = new LevelController();
