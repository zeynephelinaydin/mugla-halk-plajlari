const express = require('express');
const cors = require('cors');

const plajlarRouter = require('./routes/plajlar');
const isteklerRouter = require('./routes/istekler');

const app = express();
const PORT = 3000;

// Middleware'ler
app.use(cors());
app.use(express.json());

// API uçları
app.use('/api/plajlar', plajlarRouter);
app.use('/api/istek', isteklerRouter);

// Debug için basit route listeleme (GÜNCELLENMİŞ)
function printRoutes() {
  console.log('Mevcut Route\'lar:');
  console.log('GET /api/plajlar/test');
  console.log('GET /api/plajlar/ilceler');
  console.log('Diğer /api/istek endpoint\'leri');
}

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`++ Sunucu http://localhost:${PORT} adresinde çalışıyor`);
  printRoutes();
});