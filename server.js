// Ejemplo en una ruta GET dentro de server.js
// server.js - Versión ESM
import 'dotenv/config'; // Carga .env
import express from 'express'; // Usa import
import pool from './db.js'; // Usa import (y añade .js si es necesario)

const app = express();

// Middleware para parsear JSON
app.use(express.json());

const PORT = process.env.PORT || 3000;

// --- API CRUD ---
// Ejemplo GET /usuarios (adapta las demás rutas igual)
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: 'Error interno' });
  }
});

// ... (Asegúrate de adaptar TODAS tus otras rutas POST, PUT, DELETE aquí) ...

// --- Fin API CRUD ---

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`>>> Servidor Node.js corriendo en http://0.0.0.0:${PORT}`);
});


