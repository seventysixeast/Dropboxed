const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const imageTypeRoutes = require('./routes/imageTypeRoutes');
//const calenderRoutes = require('./routes/')
const { authenticateToken } = require('./middleware/authMiddleware');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const secret = crypto.randomBytes(32).toString('hex');
console.log('Generated JWT secret:', secret);
const app = express();
const PORT = process.env.PORT || 6977;

app.use(fileUpload());

app.use(cors(/*{
  origin: /^https?:\/\/[^/]+\.example\.com$/,
}*/));

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', parameterLimit: 100000, extended: true }));

// Serve static files from the 'build' directory (for React frontend)
app.use(express.static(path.join(__dirname, "build")));

// Serve static files from the '/public/clients' directory (for client images)
app.use('/images/clients', express.static(path.join(__dirname, 'public', 'clients')));

// Create directory if it doesn't exist
const dir = ['./public/clients'];
dir.forEach((item) => {
  if (!fs.existsSync(item)) {
    fs.mkdirSync(item);
  }
});

// Define routes
app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/booking', bookingRouter);
app.use('/imageType', imageTypeRoutes);
//app.use('/calender', calenderRoutes);

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route" });
});

// Serve index.html for all other routes
app.get("/*", (req, res, next) => {
  console.log("A11111111111");
  if (
    req.url.startsWith("/auth/") ||
    req.url.startsWith("/client/") ||
    req.url.startsWith("/booking/") ||
    req.url.includes("/imageType/") ||
    //req.url.includes("/calender/") ||
    req.url.includes("/assets/")
  ) {
    console.log("A222222222");
    return next();
  } else {
    console.log("A3333333333");
    res.sendFile(path.join(__dirname, "build", "index.html"));
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
