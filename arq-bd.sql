-- RF01
-- DML
-- Bota um usuario
INSERT INTO usuarios (cpf_cnpj, nome, email, senha, tipo)
VALUES ('222.222.222-22', 'Doador Exemplo', 'doador@exemplo.com', 'senha123', 'doador');
SET @id_doador_exemplo = LAST_INSERT_ID();
-- Bota uma categoria
INSERT INTO categorias (nome) VALUES ('Frutas');
SET @cat_frutas = LAST_INSERT_ID();
-- Da nome pros alimentos
INSERT INTO alimentos (id_categoria, nome) VALUES
                                               (@cat_frutas, 'Maçã'),
                                               (@cat_frutas, 'Banana');
SET @id_maca = LAST_INSERT_ID() - 1;
SET @id_banana = LAST_INSERT_ID();
-- Bota uma doação
INSERT INTO doacoes (id_doador, titulo, status)
VALUES (@id_doador_exemplo, 'Doação de Frutas Frescas e Cereais', 'disponivel');

SET @id_ultima_doacao = LAST_INSERT_ID();

-- Inserindo os lotes de alimentos para a doação recém-criada
INSERT INTO lotes_doacao (id_doacao, id_alimento, quantidade, peso_unidade, data_validade)
VALUES
    (@id_ultima_doacao, @id_maca, 10, 0.15, '2025-11-20'),
    (@id_ultima_doacao, @id_banana, 20, 0.12, '2025-11-18'),
    (@id_ultima_doacao, (SELECT id FROM alimentos WHERE nome = 'Arroz' LIMIT 1), 5, 1.00, '2026-06-30');

-- DQL
SELECT
    d.titulo AS Titulo_Doacao,
    DATE_FORMAT(d.data_registro, '%d/%m/%Y %H:%i') AS Data_Registro,
    d.status AS Status_Doacao,
    a.nome AS Nome_Alimento,
    c.nome AS Categoria_Alimento,
    ld.quantidade AS Quantidade,
    ld.peso_unidade AS Peso_Unitario_Kg,
    ld.data_validade AS Data_Validade
FROM
    doacoes d
        INNER JOIN
    lotes_doacao ld ON d.id = ld.id_doacao
        INNER JOIN
    alimentos a ON ld.id_alimento = a.id
        INNER JOIN
    categorias c ON a.id_categoria = c.id
WHERE
    d.id_doador = @id_doador_exemplo  -- Filtra as doações pelo ID do Doador
  AND d.data_registro >= '2025-11-01 00:00:00' -- Filtro de data inicial (exemplo)
  AND d.data_registro <= '2025-11-30 23:59:59' -- Filtro de data final (exemplo)
ORDER BY
    d.data_registro DESC, a.nome ASC;
-- FIM

-- RF02
    -- DML
-- Atualiza a quantidade e a data de validade do lote de ID = 3
UPDATE lotes_doacao
SET
    quantidade = 8,
    data_validade = '2026-05-15'
WHERE
    id = 3; -- ID do lote de Arroz dentro da doação
-- DQL
SELECT
    l.id AS ID_Lote,
    l.id_alimento AS ID_Alimento,
    a.nome AS Nome_Alimento,
    l.quantidade AS Quantidade_Itens,
    l.peso_unidade AS Peso_Unitario_Kg,
    l.data_validade AS Data_Validade,
    l.peso_unidade * l.quantidade AS Peso_Total_Kg
FROM
    lotes_doacao l
        INNER JOIN
    alimentos a ON l.id_alimento = a.id
WHERE
    l.id_doacao = 1;


-- RF03
    -- DML
-- Bota um motorista
INSERT INTO usuarios (cpf_cnpj, nome, email, senha, tipo)
VALUES ('333.333.333-33', 'Motorista Exemplo', 'motorista@exemplo.com', 'senha123', 'motorista');
SET @id_motorista_exemplo = LAST_INSERT_ID();

-- Bota um receptor
INSERT INTO usuarios (cpf_cnpj, nome, email, senha, tipo)
VALUES ('444.444.444-44', 'Receptor Exemplo', 'receptor@exemplo.com', 'senha123', 'receptor');
SET @id_receptor_exemplo = LAST_INSERT_ID();

-- Joga os cara em uma doação ai
UPDATE doacoes
SET
    id_motorista = @id_motorista_exemplo,
    id_receptor = @id_receptor_exemplo,
    status = 'aceita'
WHERE
    id = 1
  AND status = 'disponivel';
-- DQL
SELECT
    d.titulo AS Titulo_Doacao,
    DATE_FORMAT(d.data_registro, '%d/%m/%Y %H:%i') AS Data_Registro,
    d.status AS Status_Doacao,
    ud.nome AS Nome_Doador,
    ur.nome AS Nome_Receptor
FROM
    doacoes d
        INNER JOIN
    usuarios ud ON d.id_doador = ud.id -- Pega o nome do doador
        INNER JOIN
    usuarios ur ON d.id_receptor = ur.id -- Pega o nome do receptor
WHERE
    d.id_motorista = @id_motorista_exemplo
  AND d.status IN ('aceita', 'em transito')
ORDER BY
    d.data_registro DESC;

-- RF04
-- DML
INSERT INTO categorias (nome) VALUES ('Material de Limpeza');
SET @id_categoria_teste = LAST_INSERT_ID();
DELETE FROM categorias
WHERE
    id = @id_categoria_teste;

-- DQL
SELECT
    c.nome AS Nome_Categoria,
    a.nome AS Nome_Alimento
FROM
    categorias c
        LEFT JOIN
    alimentos a ON c.id = a.id_categoria -- Se tiver categoria sem alimento atribuido, mostra msm assim
ORDER BY
    c.nome ASC, a.nome ASC;

-- RF05
    -- DML
-- Altera o status da Doação de ID 1 para 'concluida', confirmando o recebimento pelo receptor.
UPDATE doacoes
SET
    status = 'concluida'
WHERE
    id = 1 -- ID da doação que está sendo finalizada
  AND id_receptor = @id_receptor_exemplo
  AND status = 'em transito';

-- DQL
SELECT
    d.titulo AS Titulo_Doacao_Recebida,
    DATE_FORMAT(d.data_registro, '%d/%m/%Y %H:%i') AS Data_Registro,
    ud.nome AS Nome_Doador,
    um.nome AS Nome_Motorista
FROM
    doacoes d
        INNER JOIN
    usuarios ud ON d.id_doador = ud.id
        LEFT JOIN
    usuarios um ON d.id_motorista = um.id
WHERE
    d.id_receptor = @id_receptor_exemplo
  AND d.status = 'concluida'
ORDER BY
    d.data_registro DESC;