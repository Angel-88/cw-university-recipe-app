const bcrypt = require('bcrypt');
const client = require('../configs/database');
const jwt = require('jsonwebtoken');

// Login Function
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await client.query(`SELECT *
                                     FROM public.users
                                     WHERE email = $1;`, [email]); //Verifying if the user exists in the database
    const user = data.rows[0];

    if (!user) {
      res.status(400).json({
        error: 'User is not registered, Sign Up first',
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => { //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: 'Server error',
          });
        } else if (result === true) { //Checking if credentials match
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );

          res.status(200).json({
            message: 'User signed in!',
            token: `Bearer ${token}`,
            id: user.id,
          });
        } else {
//Declaring the errors
          if (result !== true)
            res.status(400).json({
              error: 'Enter correct password!',
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Database error occurred while signing in!', //Database connection error
    });
  }
};
