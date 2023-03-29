const express = require('express');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const recipeRouter = require('./routes/recipe');
const categoryRouter = require('./routes/category');
const unitRouter = require('./routes/unit');
const productRouter = require('./routes/product');
const imageRouter = require('./routes/image');
const levelRouter = require('./routes/level');
const cors = require('cors');
const app = express();

app.use(express.json());

require('./configs/dotenv');
const client = require('./configs/database');

client.connect((err) => { //Connected Database
  if (err) {
    console.log(err);
  } else {
    console.log('PostgreSQL connected!');
  }
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api', recipeRouter);
app.use('/api', categoryRouter);
app.use('/api', unitRouter);
app.use('/api', productRouter);
app.use('/api', imageRouter);
app.use('/api', levelRouter);

let whitelist = ['http://localhost:4200'];
app.use(cors(
  {
    origin: (origin, callback) => {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        const message = 'The CORS policy for this origin does not allow access from the particular origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  }
));

app.get('/', (req, res) => {
  res.status(200).send('Engine Started, Ready to take off!');
});

module.exports = app;