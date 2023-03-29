const client = require('../configs/database');

module.exports.user = async (req, res) => {
  const query = `
      SELECT *
      FROM public.users
      WHERE id = ${req.params['id']}
  `;
  const users = await client.query(query);
  const result = users.rows.map(res => ({
    id: res.id,
    name: res.name,
    email: res.email,
  }));
  res.json(result[0]);
};