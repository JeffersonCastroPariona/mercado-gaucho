// db.js - Versión con Pool (Recomendada)
require('dotenv').config(); // Asegúrate que dotenv se carga si usas .env aquí
const mysql = require('mysql2/promise'); // Usamos la versión con promesas para async/await

console.log(`Intentando crear pool para: <span class="math-inline">\{process\.env\.DB\_USER\}@</span>{process.env.DB_SERVER}/${process.env.DB_DATABASE}`);

const pool = mysql.createPool({
  host: process.env.DB_SERVER || '10.158.0.7', // Lee de .env o usa valor por defecto
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'mercadoadmin',
  password: process.env.DB_PASSWORD || 'Gaucho2025!',
  database: process.env.DB_DATABASE || 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10, // Número de conexiones máximas en el pool
  queueLimit: 0
});

// Verificación opcional
pool.getConnection()
  .then(conn => {
    console.log('>>> Pool de MySQL conectado exitosamente!');
    conn.release();
  }).catch(err => {
    console.error(`!!! Error al obtener conexión del pool de MySQL: ${err.message}`);
  });

module.exports = pool; // Exportamos el pool