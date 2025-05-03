// Ejemplo en una ruta GET dentro de server.js
const pool = require('./db'); // Importas el pool

app.get('/usuarios', async (req, res) => { // La función de ruta es async
  try {
    // Usas await pool.query(...)
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: 'Error interno' });
  }
});