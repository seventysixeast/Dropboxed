const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  const jwtSecret = process.env.JWT_SECRET;
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.send({"error":err});
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
