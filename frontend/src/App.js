import React, { useState } from 'react';

const endpoints = {
  usuarios: 'http://localhost:5000/api/usuarios/criar',
  enderecos: 'http://localhost:5000/api/enderecos/criar',
  categorias: 'http://localhost:5000/api/categorias/criar',
  fornecedores: 'http://localhost:5000/api/fornecedores/criar',
  produtos: 'http://localhost:5000/api/produtos/criar',
  estoque: 'http://localhost:5000/api/estoque/criar',
  pedidos: 'http://localhost:5000/api/pedidos/criar',
  itenspedido: 'http://localhost:5000/api/itenspedido/criar',
  pagamentos: 'http://localhost:5000/api/pagamentos/criar',
  entregas: 'http://localhost:5000/api/entregas/criar',
  descontos: 'http://localhost:5000/api/descontos/criar',
  atendimentocliente: 'http://localhost:5000/api/atendimentocliente/criar',
  historicopreco: 'http://localhost:5000/api/historicopreco/criar',
  usuariologin: 'http://localhost:5000/api/usuarios/login'
};

function GenericForm({ table, fields }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(endpoints[table], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert(`${table} criado com sucesso!`);
        console.log(data);
      } else {
        alert(`Erro ao criar ${table}: ` + data.error);
      }
    } catch (err) {
      console.error(`Erro ao conectar com o servidor para ${table}:`, err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 capitalize">Inserir em {table}</h2>
      {fields.map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          onChange={handleChange}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  );
}

function LoginForm({ table, fields }) {
  const [loginData, setLoginData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(endpoints[table], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        console.log(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(`Erro ao conectar com o servidor para ${table}:`, err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 border rounded shadow mb-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 capitalize">Login</h2>
      {fields.map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          onChange={handleChange}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}

function GenericSelect({ table, fields }) {
  const [queryData, setQueryData] = useState({});
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(queryData);
    try {
      console.log(`http://localhost:5000/api/${table}/consultar?${params}`);
      const res = await fetch(`http://localhost:5000/api/${table}/consultar?${params}`);
      console.log(res);
      const data = await res.json();
      if (res.ok) {
        setResults(data);
      } else {
        alert(`Erro ao buscar dados de ${table}`);
      }
    } catch (err) {
      console.error(`Erro ao buscar dados de ${table}:`, err);
    }
  };

  return (
    <div className="p-4 border rounded shadow mb-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 capitalize">Consultar {table}</h2>
      <form onSubmit={handleSearch}>
        {fields.map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Buscar</button>
      </form>
      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Resultados:</h3>
          <pre className="bg-gray-100 p-2 rounded max-h-64 overflow-auto text-sm">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export function AdminPanel() {
  const tables = {
    usuarios: ['nome_completo', 'cpf', 'email', 'senha', 'telefone'],
    enderecos: ['id_usuario', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'pais'],
    categorias: ['nome', 'descricao'],
    fornecedores: ['nome_razao_social', 'cnpj', 'email_contato', 'telefone', 'pais'],
    produtos: ['nome', 'tipo', 'descricao', 'preco', 'id_categoria', 'id_fornecedor'],
    estoque: ['id_produto', 'local_armazenamento', 'quantidade'],
    pedidos: ['id_usuario', 'valor_total'],
    itenspedido: ['id_pedido', 'id_produto', 'quantidade', 'preco_unitario'],
    pagamentos: ['id_pedido', 'metodo_pagamento', 'valor_pago'],
    entregas: ['id_pedido', 'id_endereco_entrega', 'previsao_entrega', 'entregue_em'],
    descontos: ['id_produto', 'codigo', 'descricao', 'porcentagem', 'tipo_desconto', 'data_inicio', 'data_fim'],
    atendimentocliente: ['id_usuario', 'id_pedido', 'id_produto', 'assunto', 'mensagem'],
    historicopreco: ['id_produto', 'preco_novo', 'alterado_por']
  };

  return (
    <div className="p-6 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold mb-6">Painel de Inserção de Dados</h1>
      <LoginForm key={'usuariologin'} table={'usuariologin'} fields={['email', 'senha']} />
      {Object.entries(tables).map(([table, fields]) => (
        <div key={table} className="flex flex-col items-center">
          <GenericForm table={table} fields={fields} />
        </div>
      ))}
    </div>
  );
}

export function AdminSelectPanel() {
  const tables_select = {
    usuarios: ['id_usuario', 'nome_completo', 'cpf', 'email', 'telefone'],
    enderecos: ['id_usuario', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'pais'],
    categorias: ['nome', 'descricao'],
    fornecedores: ['nome_razao_social', 'cnpj', 'email_contato', 'telefone', 'pais'],
    produtos: ['nome', 'tipo', 'descricao', 'preco', 'categoria_id', 'fornecedor_id'],
    estoque: ['id_produto', 'quantidade', 'local_armazenamento'],
    pedidos: ['id_usuario', 'valor_total', 'status_pedido'],
    itenspedido: ['id_pedido', 'produto_id', 'quantidade', 'preco_unitario'],
    pagamentos: ['id_pedido', 'metodo_pagamento', 'status', 'valor'],
    entregas: ['id_pedido', 'data_entrega', 'status', 'codigo_rastreio'],
    descontos: ['id_produto', 'codigo', 'descricao', 'porcentagem', 'tipo_desconto', 'validade', 'data_inicio', 'data_fim'],
    atendimentocliente: ['id_chamado', 'id_usuario', 'id_pedido', 'id_produto', 'assunto', 'data', 'status_atendimento'],
    historicopreco: ['produto_id', 'data_alteracao', 'alterado_por']
  };

  return (
    <div className="p-6 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold mb-6">Painel de Consulta de Dados</h1>
      {Object.entries(tables_select).map(([table, fields]) => (
        <div key={table} className="flex flex-col items-center">
          <GenericSelect table={table} fields={fields} />
        </div>
      ))}
    </div>
  );
}