CREATE DATABASE life_connect;
USE life_connect;

SET time_zone = '-03:00';

CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    cpf_cnpj VARCHAR(20) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'doador', 'receptor', 'motorista') NOT NULL,
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

CREATE TABLE doacoes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_doador INTEGER NOT NULL,
    id_receptor INTEGER,
    id_motorista INTEGER,
    titulo VARCHAR(100),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('disponivel', 'aceita', 'em transito', 'concluida') NOT NULL DEFAULT 'disponivel',
    FOREIGN KEY (id_doador) REFERENCES usuarios(id),
    FOREIGN KEY (id_receptor) REFERENCES usuarios(id),
    FOREIGN KEY (id_motorista) REFERENCES usuarios(id)
);

CREATE TABLE lotes_doacao (
     id INTEGER PRIMARY KEY AUTO_INCREMENT,
     id_doacao INTEGER NOT NULL,
     id_alimento INTEGER NOT NULL,
     quantidade INTEGER,
     peso_unidade DECIMAL(10, 2),
     data_validade DATE,
     FOREIGN KEY (id_doacao) REFERENCES doacoes(id),
     FOREIGN KEY (id_alimento) REFERENCES alimentos(id)
);

INSERT INTO
    usuarios (cpf_cnpj, nome, email, senha, tipo)
VALUES
    ('111.111.111-11','admin','admin','admin123','admin');

INSERT INTO
    categorias (nome)
VALUES
    ('Grãos e Cereais');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO
    alimentos (id_categoria, nome)
VALUES
    (@cat_id, 'Arroz'),
    (@cat_id, 'Feijão Preto'),
    (@cat_id, 'Feijão Carioca'),
    (@cat_id, 'Lentilha'),
    (@cat_id, 'Milho de Pipoca'),
    (@cat_id, 'Macarrão'),
    (@cat_id, 'Farinha de Trigo'),
    (@cat_id, 'Fubá'),
    (@cat_id, 'Aveia');

INSERT INTO
    categorias (nome)
VALUES
    ('Enlatados e Conservas');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO
    alimentos (id_categoria, nome)
VALUES
    (@cat_id, 'Milho em Conserva'),
    (@cat_id, 'Ervilha em Conserva'),
    (@cat_id, 'Molho de Tomate'),
    (@cat_id, 'Atum em Lata'),
    (@cat_id, 'Sardinha em Lata');

INSERT INTO
    categorias (nome)
VALUES
    ('Óleos, Temperos e Açúcares');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO
    alimentos (id_categoria, nome)
VALUES
    (@cat_id, 'Óleo de Soja'),
    (@cat_id, 'Sal Refinado'),
    (@cat_id, 'Açúcar Refinado'),
    (@cat_id, 'Café em Pó'),
    (@cat_id, 'Achocolatado em Pó'),
    (@cat_id, 'Leite em Pó'),
    (@cat_id, 'Leite Condensado'),
    (@cat_id, 'Creme de Leite');

INSERT INTO
    categorias (nome)
VALUES
    ('Biscoitos e Pães');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO
    alimentos (id_categoria, nome)
VALUES
    (@cat_id, 'Biscoito Cream Cracker'),
    (@cat_id, 'Biscoito Recheado'),
    (@cat_id, 'Pão de Forma'),
    (@cat_id, 'Pão Integral');

INSERT INTO
    categorias (nome)
VALUES
    ('Bebidas');
SET @cat_id = LAST_INSERT_ID();

INSERT INTO
    alimentos (id_categoria, nome)
VALUES
    (@cat_id, 'Leite'),
    (@cat_id, 'Suco em Caixa'),
    (@cat_id, 'Suco em Pó');