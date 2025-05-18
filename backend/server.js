const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

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



app.post('/api/usuarios/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const result = await pool.query(
      `SELECT senha_hash, salt FROM usuarios WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const { senha_hash, salt } = result.rows[0];
    const hashedPassword = await bcrypt.hash(senha, salt);

    if (hashedPassword === senha_hash) {
      res.status(200).json({ message: 'Sucesso!' });
    } else {
      res.status(403).json({ message: 'OOPS! Acesso negado, tente novamente' });
    }

  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

app.post('/api/usuarios/criar', async (req, res) => {
  try {
    const {
      nome_completo, cpf, email,
      senha, telefone
    } = req.body;
    console.log(req.body)
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    const hashedPassword = await bcrypt.hash(senha, salt);
    console.log(hashedPassword)

    const result = await pool.query(
      `INSERT INTO usuarios (
         nome_completo, cpf, email, senha_hash, telefone, salt
       ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nome_completo, cpf, email, hashedPassword, telefone, salt]
    ); 
    console.log(result)

    res.status(201).json(
      result.rows[0]
    );
  } catch (err) {
    console.error('Erro ao inserir:', err);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// Função genérica para os demais endpoints
const createGenericSelectHandler = (tableName, fields) => {
  return async (req, res) => {
    try {
      const conditions = [];
      const values = [];

      fields.forEach((field) => {
        const value = req.query[field];
        
        if (value !== null && value !== undefined && value !== ' ' && value !== '') {
          values.push(value);
          conditions.push(`${field} = $${values.length}`);
        }
      });

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const fieldsToReturn = `${fields.join(', ')}`;
      const query = `SELECT ${fieldsToReturn} FROM ${tableName} ${whereClause}`;

      const result = await pool.query(query, values);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(`Erro ao buscar em ${tableName}:`, err);
      res.status(500).json({ error: `Erro ao buscar dados em ${tableName}.` });
    }
  };
};



// Função genérica para os demais endpoints
const createGenericPostHandler = (tableName, fields) => {
  return async (req, res) => {
    try {
      const values = fields.map(field => req.body[field]);
      const placeholders = fields.map((_, idx) => `$${idx + 1}`).join(', ');
      const query = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;

      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(`Erro ao inserir em ${tableName}:`, err);
      res.status(500).json({ error: `Erro ao criar registro em ${tableName}.` });
    }
  };
};

// Outros endpoints
app.post('/api/enderecos/criar', createGenericPostHandler('enderecos', ['id_usuario', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'pais']));
app.post('/api/categorias/criar', createGenericPostHandler('categorias', ['nome', 'descricao']));
app.post('/api/fornecedores/criar', createGenericPostHandler('fornecedores', ['nome_razao_social', 'cnpj', 'email_contato', 'telefone', 'pais']));
app.post('/api/produtos/criar', createGenericPostHandler('produtos', ['nome', 'tipo', 'descricao', 'preco', 'categoria_id', 'fornecedor_id']));
app.post('/api/estoque/criar', createGenericPostHandler('estoque', ['id_produto', 'quantidade', 'local_armazenamento']));
app.post('/api/pedidos/criar', createGenericPostHandler('pedidos', ['id_usuario', 'valor_total']));
app.post('/api/itenspedido/criar', createGenericPostHandler('itenspedido', ['id_pedido', 'produto_id', 'quantidade', 'preco_unitario']));
app.post('/api/pagamentos/criar', createGenericPostHandler('pagamentos', ['id_pedido', 'metodo_pagamento', 'valor_pago']));
app.post('/api/entregas/criar', createGenericPostHandler('entregas', ['id_pedido', 'id_endereco_entrega', 'previsao_entrega', 'entregue_em']));
app.post('/api/descontos/criar', createGenericPostHandler('descontos', ['id_produto', 'codigo', 'descricao', 'porcentagem', 'tipo_desconto', 'validade', 'data_inicio', 'data_fim']));
app.post('/api/atendimentocliente/criar', createGenericPostHandler('atendimentocliente', ['id_usuario', 'id_pedido', 'id_produto', 'assunto', 'mensagem']));
app.post('/api/historicopreco/criar', createGenericPostHandler('historicopreco', ['produto_id', 'preco_novo', 'data_alteracao']));



// Outros endpoints
app.get('/api/usuarios/consultar', createGenericSelectHandler('usuarios', ['id_usuario', 'nome_completo', 'cpf', 'email', 'telefone']));
app.get('/api/enderecos/consultar', createGenericSelectHandler('enderecos', ['id_usuario', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'pais']));
app.get('/api/categorias/consultar', createGenericSelectHandler('categorias', ['nome', 'descricao']));
app.get('/api/fornecedores/consultar', createGenericSelectHandler('fornecedores', ['nome_razao_social', 'cnpj', 'email_contato', 'telefone', 'pais']));
app.get('/api/produtos/consultar', createGenericSelectHandler('produtos', ['nome', 'tipo', 'descricao', 'preco', 'categoria_id', 'fornecedor_id']));
app.get('/api/estoque/consultar', createGenericSelectHandler('estoque', ['id_produto', 'quantidade', 'local_armazenamento']));
app.get('/api/pedidos/consultar', createGenericSelectHandler('pedidos', ['id_usuario', 'valor_total', 'status_pedido']));
app.get('/api/itenspedido/consultar', createGenericSelectHandler('itenspedido', ['id_pedido', 'produto_id', 'quantidade', 'preco_unitario']));
app.get('/api/pagamentos/consultar', createGenericSelectHandler('pagamentos', ['id_pedido', 'metodo_pagamento', 'status', 'valor']));
app.get('/api/entregas/consultar', createGenericSelectHandler('entregas', ['id_pedido', 'data_entrega', 'status', 'codigo_rastreio']));
app.get('/api/descontos/consultar', createGenericSelectHandler('descontos', ['id_produto', 'codigo', 'descricao', 'porcentagem', 'tipo_desconto', 'validade', 'data_inicio', 'data_fim']));
app.get('/api/atendimentocliente/consultar', createGenericSelectHandler('atendimentocliente', ['id_chamado', 'id_usuario', 'id_pedido', 'id_produto', 'assunto', 'data', 'status_atendimento']));
app.get('/api/historicopreco/consultar', createGenericSelectHandler('historicopreco', ['produto_id', 'data_alteracao', 'alterado_por']));

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


