-- Apagar tabelas caso já existam
DROP TABLE IF EXISTS atendimentocliente, descontos, entregas, pagamentos, itenspedido, enderecos, pedidos, estoque, produtos, fornecedores, categorias, usuarios, historicopreco;


-- Tabela de Usuários
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    cpf CHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    telefone VARCHAR(20),


    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP
);

-- Tabela de Endereços
CREATE TABLE enderecos (
    id_endereco SERIAL PRIMARY KEY,
    id_usuario INT,
    rua VARCHAR(200) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(1024),
    bairro VARCHAR(200),
    cidade VARCHAR(200) NOT NULL,
    estado VARCHAR(200) NOT NULL,
    cep CHAR(30) NOT NULL,
    pais VARCHAR(50) DEFAULT 'Brasil',
    CONSTRAINT fk_endereco_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabela de Categorias
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL,
    descricao TEXT
);

-- Tabela de Fornecedores
CREATE TABLE fornecedores (
    id_fornecedor SERIAL PRIMARY KEY,
    nome_razao_social VARCHAR(100) NOT NULL,
    cnpj VARCHAR(100) UNIQUE,
    email_contato VARCHAR(100),
    telefone VARCHAR(20),
    pais VARCHAR(50)
);

-- Tabela de Produtos
CREATE TABLE produtos (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    id_categoria INT,
    id_fornecedor INT,


    cadastrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,
    criado_por VARCHAR(100) DEFAULT 'system',


    CONSTRAINT fk_produto_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    CONSTRAINT fk_produto_fornecedor FOREIGN KEY (id_fornecedor) REFERENCES fornecedores(id_fornecedor)
);

-- Tabela de Estoque
CREATE TABLE estoque (
    id_estoque SERIAL PRIMARY KEY,
    id_produto INT,
    local_armazenamento VARCHAR(100),
    quantidade INT NOT NULL,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_estoque_produto FOREIGN KEY (id_produto) REFERENCES produtos(id_produto) ON DELETE CASCADE
);

-- Tabela de Pedidos
CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INT,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_pedido VARCHAR(30) DEFAULT 'Pendente',
    valor_total NUMERIC(10,2) NOT NULL,


    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,
    criado_por VARCHAR(100) DEFAULT 'system',


    CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabela de ItensPedido
CREATE TABLE itenspedido (
    id_item SERIAL PRIMARY KEY,
    id_pedido INT,
    id_produto INT,
    quantidade INT NOT NULL,
    preco_unitario NUMERIC(10,2) NOT NULL,


    CONSTRAINT fk_itempedido_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_itempedido_produto FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Tabela de Pagamentos
CREATE TABLE pagamentos (
    id_pagamento SERIAL PRIMARY KEY,
    id_pedido INT,
    metodo_pagamento VARCHAR(50),
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_pagamento VARCHAR(30) DEFAULT 'Pendente',
    valor_pago NUMERIC(10,2) NOT NULL,

    CONSTRAINT fk_pagamento_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);

-- Tabela de Entregas
CREATE TABLE entregas (
    id_entrega SERIAL PRIMARY KEY,
    id_pedido INT,
    id_endereco_entrega INT,
    status_entrega VARCHAR(30) DEFAULT 'Preparando',
    previsao_entrega TIMESTAMP,
    entregue_em TIMESTAMP,


    CONSTRAINT fk_entrega_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    CONSTRAINT fk_entrega_endereco FOREIGN KEY (id_endereco_entrega) REFERENCES enderecos(id_endereco)
);

-- Tabela de Descontos
CREATE TABLE descontos (
    id_desconto SERIAL PRIMARY KEY,
    id_produto INT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    descricao TEXT,
    porcentagem NUMERIC(10,2) NOT NULL,
    tipo_desconto CHAR(20) CHECK (tipo_desconto IN ('percentual', 'valor_fixo')),
    data_inicio DATE,
    data_fim DATE,


    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,
    criado_por VARCHAR(100) DEFAULT 'system',


    CONSTRAINT fk_desconto_produto FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Tabela de Atendimento ao Cliente
CREATE TABLE atendimentocliente (
    id_chamado SERIAL PRIMARY KEY,
    id_usuario INT,
    id_pedido INT,
    id_produto INT,
    assunto VARCHAR(100),
    mensagem TEXT NOT NULL,
    status_atendimento VARCHAR(20) DEFAULT 'Aberto',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP,


    CONSTRAINT fk_atendimento_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_atendimento_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    CONSTRAINT fk_atendimento_produto FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Tabela de Histórico de Preços
CREATE TABLE historicopreco (
    id_historico SERIAL PRIMARY KEY,
    id_produto INT,
    preco_novo NUMERIC(10,2) NOT NULL,
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    alterado_por VARCHAR(100) DEFAULT 'system',

    CONSTRAINT fk_historico_produto FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Índices adicionais
CREATE INDEX idx_pedidos_usuario ON pedidos(id_usuario);
CREATE INDEX idx_atendimentos_usuario ON atendimentocliente(id_usuario);
