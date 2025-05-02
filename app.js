const express = require('express');
const app = express();
const db = require('./db'); // Asegúrate de tener el archivo db.js con la configuración de MySQL

app.use(express.json());

// Ejemplo de una ruta para obtener datos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).send('Error al consultar la base de datos');
      return;
    }
    res.json(results);
  });
});

// Configura el puerto para el servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
