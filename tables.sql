-- Apagar tabelas caso já existam
DROP TABLE IF EXISTS AtendimentoCliente, Descontos, Entregas, Pagamentos, Enderecos, Pedidos, Estoque, Produtos, Fornecedores, Categorias, Usuarios;

-- Tabela de Usuários
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    cpf CHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,
    criado_por VARCHAR(100)
);

-- Tabela de Endereços
CREATE TABLE Enderecos (
    id_endereco SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    rua VARCHAR(200) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(1024),
    bairro VARCHAR(200),
    cidade VARCHAR(200) NOT NULL,
    estado VARCHAR(200) NOT NULL,
    cep CHAR(30) NOT NULL,
    pais VARCHAR(50) DEFAULT 'Brasil'
);

-- Tabela de Categorias
CREATE TABLE Categorias (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL,
    descricao TEXT
);

-- Tabela de Fornecedores
CREATE TABLE Fornecedores (
    id_fornecedor SERIAL PRIMARY KEY,
    nome_razao_social VARCHAR(100) NOT NULL,
    cnpj VARCHAR(100) UNIQUE,
    email_contato VARCHAR(100),
    telefone VARCHAR(20),
    pais VARCHAR(50)
);

-- Tabela de Estoque (mantida com campo de quantidade)
CREATE TABLE Estoque (
    id_estoque SERIAL PRIMARY KEY,
    id_produto INT REFERENCES Produtos(id_produto) ON DELETE CASCADE,
    local_armazenamento VARCHAR(100),
    quantidade INT NOT NULL,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos (sem alterações em relação à última versão)
CREATE TABLE Produtos (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    id_categoria INT REFERENCES Categorias(id_categoria),
    id_fornecedor INT REFERENCES Fornecedores(id_fornecedor),
    cadastrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,
    criado_por VARCHAR(100)
);


-- Tabela de Pedidos (sem referência direta a produtos)
CREATE TABLE Pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuarios(id_usuario),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_pedido VARCHAR(30) DEFAULT 'Pendente',
    valor_total NUMERIC(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,
    criado_por VARCHAR(100)
);


-- Tabela auxiliar ItensPedido (nova)
CREATE TABLE ItensPedido (
    id_item SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES Pedidos(id_pedido) ON DELETE CASCADE,
    id_produto INT REFERENCES Produtos(id_produto),
    quantidade INT NOT NULL,
    preco_unitario NUMERIC(10,2) NOT NULL
);

-- Tabela de Pagamentos
CREATE TABLE Pagamentos (
    id_pagamento SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES Pedidos(id_pedido),
    metodo_pagamento VARCHAR(50),
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_pagamento VARCHAR(30) DEFAULT 'Pendente',
    valor_pago NUMERIC(10,2) NOT NULL
);

-- Tabela de Entregas
CREATE TABLE Entregas (
    id_entrega SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES Pedidos(id_pedido),
    id_endereco_entrega INT REFERENCES Enderecos(id_endereco),
    status_entrega VARCHAR(30) DEFAULT 'Preparando',
    previsao_entrega TIMESTAMP,
    entregue_em TIMESTAMP
);

-- Tabela de Descontos
CREATE TABLE Descontos (
    id_desconto SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    descricao TEXT,
    porcentagem NUMERIC(10,2) NOT NULL,
    tipo_desconto CHAR(20) CHECK (tipo_desconto IN ('percentual', 'valor_fixo')),
    data_inicio DATE,
    data_fim DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,
    criado_por VARCHAR(100)
);


-- Tabela de Atendimento ao Cliente
CREATE TABLE AtendimentoCliente (
    id_chamado SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES Usuarios(id_usuario),
    id_pedido INT REFERENCES Pedidos(id_pedido),
    id_produto INT REFERENCES Produtos(id_produto),
    assunto VARCHAR(100),
    mensagem TEXT NOT NULL,
    status_atendimento VARCHAR(20) DEFAULT 'Aberto',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,
    criado_por VARCHAR(100)
);

-- Tabela de Histórico de Preços (nova)
CREATE TABLE HistoricoPreco (
    id_historico SERIAL PRIMARY KEY,
    id_produto INT REFERENCES Produtos(id_produto),
    preco_novo NUMERIC(10,2) NOT NULL,
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    alterado_por VARCHAR(100)
);

CREATE INDEX idx_pedidos_usuario ON Pedidos(id_usuario);
CREATE INDEX idx_atendimentos_usuario ON AtendimentoCliente(id_usuario);