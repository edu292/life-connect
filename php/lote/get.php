<?php
global $conexao;
include_once('../conexao.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if (isset($_GET['id-doacao'])) {
    $id_doacao = $_GET['id-doacao'];
    $stmt = $conexao->prepare("
        SELECT
            l.id,
            l.id_alimento,
            a.nome AS nome_alimento,
            l.quantidade,
            l.peso_unidade,
            l.data_validade,
            l.peso_unidade * l.quantidade AS peso_total
        FROM lote_doacao l
        INNER JOIN alimentos a ON l.id_alimento = a.id
        WHERE l.id_doacao = ?
    ");
    $stmt->bind_param("i", $id_doacao);
} else if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare("SELECT * FROM lote_doacao WHERE id = ?");
    $stmt->bind_param("i", $id);
} else {
    $stmt = $conexao->prepare("SELECT * FROM lote_doacao");
}

$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $tabela = $resultado->fetch_all(MYSQLI_ASSOC);

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Registros encontrados',
        'data' => $tabela
    ];
} else {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Nenhum registro encontrado',
        'data' => []
    ];
}

$stmt->close();
$conexao->close();

header("Content-type:application/json;charset:utf-8");
echo json_encode($retorno);
