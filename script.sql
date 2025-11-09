CREATE DATABASE life_connect;
USE life_connect;

SET time_zone = '-03:00';

CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    cpf_cnpj VARCHAR(20) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    rua VARCHAR(50),
    numero INTEGER,
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(20),
    cep VARCHAR(50)
);

CREATE TABLE categorias (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50)
);

CREATE TABLE alimentos (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_categoria INTEGER,
    nome VARCHAR(100),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

CREATE TABLE doacao (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao VARCHAR(100),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('DISPONIVEL', 'ACEITA', 'EM TRANSITO', 'COUNCLUIDA') NOT NULL DEFAULT 'DISPONIVEL',
);

CREATE TABLE lote_doacao (
     id INTEGER PRIMARY KEY AUTO_INCREMENT,
     id_doacao INTEGER NOT NULL,
     id_alimento INTEGER NOT NULL,
     quantidade INTEGER,
     peso_unidade DECIMAL(10, 2),
     data_validade DATE,
     FOREIGN KEY (id_doacao) REFERENCES doacao(id),
     FOREIGN KEY (id_alimento) REFERENCES alimentos(id)
);


INSERT INTO usuarios(
    cpf_cnpj,
    nome,
    email,
    senha,
    tipo
) VALUES (
    '111.111.111-11',
    'admin',
    'admin',
    'admin123',
    'admin'
);

INSERT INTO Categorias (nome) VALUES ('Grãos e Cereais');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO Alimentos (id_categoria, nome) VALUES
    (@cat_id, 'Arroz'),
    (@cat_id, 'Feijão Preto'),
    (@cat_id, 'Feijão Carioca'),
    (@cat_id, 'Lentilha'),
    (@cat_id, 'Milho de Pipoca'),
    (@cat_id, 'Macarrão'),
    (@cat_id, 'Farinha de Trigo'),
    (@cat_id, 'Fubá'),
    (@cat_id, 'Aveia');

INSERT INTO Categorias (nome) VALUES ('Enlatados e Conservas');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO Alimentos (id_categoria, nome) VALUES
    (@cat_id, 'Milho em Conserva'),
    (@cat_id, 'Ervilha em Conserva'),
    (@cat_id, 'Molho de Tomate'),
    (@cat_id, 'Atum em Lata'),
    (@cat_id, 'Sardinha em Lata');

INSERT INTO Categorias (nome) VALUES ('Óleos, Temperos e Açúcares');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO Alimentos (id_categoria, nome) VALUES
    (@cat_id, 'Óleo de Soja'),
    (@cat_id, 'Sal Refinado'),
    (@cat_id, 'Açúcar Refinado'),
    (@cat_id, 'Café em Pó'),
    (@cat_id, 'Achocolatado em Pó'),
    (@cat_id, 'Leite em Pó'),
    (@cat_id, 'Leite Condensado'),
    (@cat_id, 'Creme de Leite');

INSERT INTO Categorias (nome) VALUES ('Biscoitos e Pães');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO Alimentos (id_categoria, nome) VALUES
    (@cat_id, 'Biscoito Cream Cracker'),
    (@cat_id, 'Biscoito Recheado'),
    (@cat_id, 'Pão de Forma'),
    (@cat_id, 'Pão Integral');

INSERT INTO Categorias (nome) VALUES ('Bebidas');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO Alimentos (id_categoria, nome) VALUES
    (@cat_id, 'Leite'),
    (@cat_id, 'Suco em Caixa'),
    (@cat_id, 'Suco em Pó');