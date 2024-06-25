const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const imageTypeRoutes = require('./routes/imageTypeRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const photographerRoutes = require('./routes/photographerRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const photographerAdminRoutes = require('./routes/photographerAdminRoutes');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const quickbooksRoutes = require('./routes/quickbooksRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const compression = require('compression');


const secret = crypto.randomBytes(32).toString('hex');
const app = express();
const PORT = process.env.PORT || 6977;

app.use(fileUpload());
app.use(compression());

app.use(cors(/*{
  origin: /^https?:\/\/[^/]+\.example\.com$/,
}*/));

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', parameterLimit: 100000, extended: true }));

app.use(express.static(path.join(__dirname, "build")));

app.use('/images/clients', express.static(path.join(__dirname, 'public', 'clients')));

app.use('/images/gallery', express.static(path.join(__dirname, 'public', 'gallery')));

const dirs = ['./public/clients', './public/gallery'];
const createDirectories = (directories) => {
  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};
createDirectories(dirs);

app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/service', serviceRoutes);
app.use('/booking', bookingRouter);
app.use('/imageType', imageTypeRoutes);
app.use('/notification', notificationRoutes);
app.use('/photographer', photographerRoutes);
app.use('/collection', collectionRoutes);
app.use('/photographerAdmin', photographerAdminRoutes);
app.use('/todo', todoRoutes);
app.use('/user', userRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/qb', quickbooksRoutes);
app.use('/orders', ordersRoutes);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route" });
});

app.get("/*", (req, res, next) => {
  if (
    req.url.startsWith("/auth/") ||
    req.url.startsWith("/client/") ||
    req.url.startsWith("/service/") ||
    req.url.startsWith("/booking/") ||
    req.url.includes("/imageType/") ||
    req.url.includes("/notification/") ||
    req.url.includes("/photographer/") ||
    req.url.includes("/collection/") ||
    req.url.includes("/assets/") ||
    req.url.includes("/todo/") ||
    req.url.includes("/user/") ||
    req.url.includes("/invoice/") ||
    req.url.includes("/orders/") ||
    req.url.includes("/qb/")

  )
    return next();
  else
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
