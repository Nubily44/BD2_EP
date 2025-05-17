const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SGEC',
  password: 'root',
  port: 5432,
});

app.post('/api/usuarios', async (req, res) => {
  try {
    const {
      nome_completo, cpf, email,
      senha_hash, salt, telefone, criado_por
    } = req.body;

    const result = await pool.query(
      `INSERT INTO usuarios (
         nome_completo, cpf, email, senha_hash, salt, telefone, criado_por
       ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nome_completo, cpf, email, senha_hash, salt, telefone, criado_por]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir:', err);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

