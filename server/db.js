// server/db.js
//pg modülden pool sınıfı alındı
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'zeynephelinaydin',
  host: 'localhost',
  database: 'halk_plajlari',
  port: 5432
});
//dışa aktarım
module.exports = pool;
