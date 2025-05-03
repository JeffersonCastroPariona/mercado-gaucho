// db.js - Versión con Pool (Recomendada)
// db.js - Versión ESM con Pool
import 'dotenv/config'; // Carga .env inmediatamente (forma ESM)
import mysql from 'mysql2/promise'; // Usa import

console.log(`Intentando crear pool para: <span class="math-inline">\{process\.env\.DB\_USER\}@</span>{process.env.DB_SERVER}/${process.env.DB_DATABASE}`);

const pool = mysql.createPool({
  host: process.env.DB_SERVER || '10.158.0.7',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'mercadoadmin',
  password: process.env.DB_PASSWORD || 'Gaucho2025!',
  database: process.env.DB_DATABASE || 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
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

// Exporta el pool usando la sintaxis ESM
export default pool;
