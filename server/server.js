const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const imageTypeRoutes = require('./routes/imageTypeRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload')

const secret = crypto.randomBytes(64).toString('hex');
const app = express();
const PORT = process.env.PORT || 6977;
app.use(fileUpload())
let clientbuildpath = path.join(__dirname, "build");

app.use(cors(/*{
  origin: /^https?:\/\/[^/]+\.example\.com$/,
}*/));

app.use(bodyParser.json({
  limit: '500mb'
}));

app.use(bodyParser.urlencoded({
  limit: '500mb',
  parameterLimit: 100000,
  extended: true
}));

const dir = ['./public/clients'];
dir.forEach(function (item) {
  if (!fs.existsSync(item)) {
    fs.mkdirSync(item);
  }
});

app.get("/*", (req, res, next) => {
  if (
    req.url.startsWith("/auth") ||
    req.url.startsWith("/client") ||
    req.url.startsWith("/booking") ||
    req.url.includes("/imageType/") ||
    req.url.includes("/assets/")
  )
    return next();
  if (req.url.startsWith("/public/")) {
    let reqfilename = req.url.replace("/public/", "");
    reqfilename = decodeURI(reqfilename);
    res.sendFile(path.join(__dirname, "public", reqfilename));
  } else {
    res.sendFile(clientbuildpath + "/index.html");
  }
});

app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/booking', bookingRouter);
app.use('/imageType', imageTypeRoutes);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
