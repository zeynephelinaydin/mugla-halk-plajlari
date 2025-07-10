const express = require('express');
const router = express.Router();
const db = require('../db'); // db bağlantısı yapıldı

// GET /api/plajlar (sadece onay alan plajları getirir)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM plajlar WHERE onayli = true ORDER BY ilce, isim'
    );
    res.json(result.rows); // JSON olarak döndür
  } catch (err) {
    console.error('Veri alınırken hata oluştu:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});
// Test endpoint'i (yeni eklenen kısım)
router.get('/test', (req, res) => {
  res.json({ message: "Plajlar route çalışıyor!" });
});

// İlçe listesi endpoint'i (asıl ihtiyacınız olan)
router.get('/ilceler', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT DISTINCT ilce FROM plajlar WHERE onayli = true ORDER BY ilce'
    );
    res.json(result.rows.map(row => row.ilce));
  } catch (err) {
    console.error('Hata:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
