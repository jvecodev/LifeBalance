const express = require('express');
const mysql = require('mysql2');



const app = express();

app.use(express.static('./pages'));

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


const connection = mysql.createConnection({
    host: 'junction.proxy.rlwy.net',
    user: 'root',
    password: 'wkDytlypcgYLaWZFfzBqvpGflwSrBXrs',
    database: 'railway',
    connectTimeout: 10000,
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
    } else {
        console.log('Conectado ao banco de dados MySQL!');
    }
    connection.end();
});

