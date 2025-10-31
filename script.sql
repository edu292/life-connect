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

CREATE TABLE entrega (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao VARCHAR(100),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(100)
);

CREATE TABLE lote_doacao (
    id_entrega INTEGER,
    id_alimento INTEGER,
    quantidade INTEGER,
    peso_item DECIMAL(10, 2),
    data_validade DATE,
    FOREIGN KEY (id_entrega) REFERENCES entrega(id),
    FOREIGN KEY (id_alimento) REFERENCES alimentos(id),
);

