// db.js o database.js
const mysql = require('mysql2');

// Configura la conexión a tu base de datos
const connection = mysql.createConnection({
  host: '10.158.0.7', // La IP de la máquina que tiene la base de datos
  user: 'mercadoadmin',     // Tu usuario MySQL
  password: 'Gaucho2025!', // Tu contraseña MySQL
  database: 'ecommerce' // Nombre de la base de datos
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Exporta la conexión para usarla en otras partes del proyecto
module.exports = connection;
