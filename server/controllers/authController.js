const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { generateAccessToken } = require('../utils/jwtUtils');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user.id);
    res.json({ accessToken });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
