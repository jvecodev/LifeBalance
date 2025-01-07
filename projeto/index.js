const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const app = express();
app.use(express.json()); 
app.use(express.static('./pages')); 

const DATABASE_URL = process.env.DATABASE_URL;
const connection = mysql.createConnection(DATABASE_URL);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados!');
    }
});


// Rota GET para exibir os dados do último usuário cadastrado
app.get('/api/perfil', (req, res) => {
    const query = 'SELECT nome, email1 FROM Usuario ORDER BY id_usuario DESC LIMIT 1';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ message: 'Erro ao buscar usuário' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado' });
        }

        res.status(200).json({ usuario: results[0] });
    });
});

// Rota PUT para atualizar os dados do usuário
app.put('/api/perfil', (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.user; // Usar o id do usuário autenticado (adicionar autenticação)

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const hashedPassword = bcrypt.hashSync(senha, 10);

    const query = 'UPDATE Usuario SET nome = ?, email1 = ?, senha = ? WHERE id_usuario = ?';
    connection.query(query, [nome, email, hashedPassword, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            return res.status(500).json({ message: 'Erro ao atualizar usuário', error: err });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    });
});


app.get('/api/cadastrar', (req, res) => {
    const query = 'SELECT nome FROM Usuario ORDER BY id_usuario DESC LIMIT 1'; 
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ message: 'Erro ao buscar usuário' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado' });
        }

        res.status(200).json({ nome: results[0].nome });
    });
});



app.post('/api/cadastrar', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const hashedPassword = bcrypt.hashSync(senha, 10);

    const query = 'INSERT INTO Usuario (nome, email1, senha) VALUES (?, ?, ?)';
    connection.query(query, [nome, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    });
});


app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const query = 'SELECT * FROM Usuario WHERE email1 = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err);
            return res.status(500).json({ message: 'Erro ao verificar usuário' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        const usuario = results[0];

        if (!bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido', token });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
