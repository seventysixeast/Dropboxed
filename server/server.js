const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');
console.log('Generated JWT secret:', secret);
const app = express();
const PORT = process.env.PORT || 6977;

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
