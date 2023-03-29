const knex = require('knex');
const path = require('path');

// Create database object
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '1234567890',
    database: 'recipe_app',
  },
});

class ImageController {
  async createImage (req, res) {
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;

    db.insert({
      filename,
      filepath,
      mimetype,
      size,
    })
      .into('image')
      .then(() => res.json({ success: true, filename }))
      .catch(err =>
        res.json({ success: false, message: 'upload failed', stack: err.stack }),
      );
  }

  async getImage (req, res) {
    const { filename } = req.params;
    db.select('*')
      .from('image')
      .where({ filename })
      .then(images => {
        if (images[0]) {
          const dirname = path.resolve();
          const fullfilepath = path.join(dirname, images[0].filepath);
          return res.type(images[0].mimetype).sendFile(fullfilepath);
        }
        return Promise.reject(new Error('Image does not exist'));
      })
      .catch(err =>
        res
          .status(404)
          .json({ success: false, message: 'not found', stack: err.stack }),
      );
  }
}

module.exports = new ImageController();
