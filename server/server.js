const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');


const secret = crypto.randomBytes(64).toString('hex');
console.log('Generated JWT secret:', secret);
const app = express();
const PORT = process.env.PORT || 6977;

app.use(cors({
  origin: 'http://localhost:3000',
}));


app.use(bodyParser.json());
// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/booking', bookingRouter);

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route' });
});

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
