// app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require("./database/db");
const router = require("./routers/index");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require('cors');

dotenv.config();
const port = process.env.PORT || 5000;

// CORS ayarları
const corsOptions = {
    origin: 'http://localhost:5173',  
    methods: 'GET,POST,PUT,DELETE',  
    credentials: true,  
  };
  
  // CORS'u kullanmak için
  app.use(cors(corsOptions));

  
// Middleware
app.use(express.json());
app.use(cookieParser());

// Veritabanı bağlantısı
connectDB();

// Ana rotalar
app.get('/', (req, res) => {
    res.send('Merhaba Dünya! Express sunucusu çalışıyor.');
});

// /api yoluyla gelen talepleri yönlendirin
app.use("/api", router);

// Error Handler
app.use(customErrorHandler);

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu ${port} adresinde çalışıyor`);
});
