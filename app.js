require('dotenv').config(); // Carga las variables de .env a process.env

// Ahora puedes acceder a las variables así:
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '3306'),
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // Convierte string a boolean
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true' // Convierte string a boolean
    }
};

const appPort = process.env.PORT || 3000; // Puerto para el servidor web

// ... resto de tu código usando dbConfig y appPort ...
// Ejemplo de conexión:
// const sql = require('mssql');
// sql.connect(dbConfig).then(pool => { ... }).catch(err => { ... });