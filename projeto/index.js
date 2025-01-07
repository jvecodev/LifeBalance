import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();
app.use(express.json()); 
app.use(express.static('./pages'));

// Conexão com o banco de dados (uso de async/await)
const DATABASE_URL = process.env.DATABASE_URL;

async function verificarConexao() {
    try {
        const connection = await mysql.createConnection(DATABASE_URL);
        await connection.query('SELECT 1');  // Consulta simples para verificar a conexão
        console.log('Conexão bem-sucedida ao banco de dados!');
        return connection;
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);  // Encerra o servidor em caso de erro na conexão com o banco
    }
}

const connection = await verificarConexao();  // Chama a função para verificar a conexão

// Middleware de autenticação de token
function autenticarToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        // Verifica o token usando o segredo definido no .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Decodifica e adiciona o usuário ao request
        next();
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        res.status(403).json({ error: 'Token inválido' });
    }
}

// Endpoint para buscar o perfil do usuário
app.get('/api/perfil', async (req, res) => {
    try {
        const query = 'SELECT nome, email1 FROM Usuario ORDER BY id_usuario DESC LIMIT 1';
        const [results] = await connection.query(query);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado' });
        }

        res.status(200).json({ usuario: results[0] });
    } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
});

// Endpoint para atualizar o perfil do usuário
app.put('/api/perfil', autenticarToken, async (req, res) => {
    console.log('Dados recebidos no PUT:', req.body);
    console.log('Usuário autenticado:', req.user);

    try {
        const { nome, email } = req.body;

        const [usuarioAtualizado] = await connection.query(
            'UPDATE Usuario SET nome = ?, email1 = ? WHERE id_usuario = ?',
            [nome, email, req.user.id_usuario]
        );

        if (usuarioAtualizado.affectedRows > 0) {
            res.json({ message: 'Usuário atualizado com sucesso' });
        } else {
            res.status(400).json({ error: 'Usuário não encontrado ou não atualizado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

app.get('/api/cadastrar', async (req, res) => {
    const query = 'SELECT nome FROM Usuario ORDER BY id_usuario DESC LIMIT 1'; 
    try {
        const [results] = await connection.query(query);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado' });
        }
        res.status(200).json({ nome: results[0].nome });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
});


// Endpoint para cadastrar um novo usuário
app.post('/api/cadastrar', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const hashedPassword = bcrypt.hashSync(senha, 10);

        const query = 'INSERT INTO Usuario (nome, email1, senha) VALUES (?, ?, ?)';
        await connection.query(query, [nome, email, hashedPassword]);

        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
    }
});

// Endpoint para login
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
        const query = 'SELECT * FROM Usuario WHERE email1 = ?';
        const [results] = await connection.query(query, [email]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        const usuario = results[0];

        if (!bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        const token = jwt.sign({ id_usuario: usuario.id_usuario, nome: usuario.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error('Erro ao verificar usuário:', err);
        res.status(500).json({ message: 'Erro ao verificar usuário' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
