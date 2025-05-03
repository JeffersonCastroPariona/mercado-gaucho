const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json()); // Para poder parsear el cuerpo de las peticiones como JSON

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'IP_DE_LA_VM_DE_DATOS',
  user: 'mercadoadmin',
  password: 'Gaucho2025!',
  database: 'ecommerce'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Rutas CRUD

// 1. Crear un producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio, descripcion } = req.body;
  const query = 'INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)';
  db.query(query, [nombre, precio, descripcion], (err, result) => {
    if (err) {
      return res.status(500).send('Error al crear el producto');
    }
    res.status(201).json({ message: 'Producto creado', id: result.insertId });
  });
});

// 2. Obtener todos los productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener productos');
    }
    res.json(results);
  });
});

// 3. Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener el producto');
    }
    if (results.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(results[0]);
  });
});

// 4. Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion } = req.body;
  const query = 'UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?';
  db.query(query, [nombre, precio, descripcion, id], (err, result) => {
    if (err) {
      return res.status(500).send('Error al actualizar el producto');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json({ message: 'Producto actualizado' });
  });
});

// 5. Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error al eliminar el producto');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json({ message: 'Producto eliminado' });
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
