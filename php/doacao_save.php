<?php
include $conexao;

$retorno = [
    'status' => '', 
    'mensagem' => '',
    'data' => []
];
    $id_lote = '';
    $id_entrega = '';
    $id_alimento = '';
    $quantidade = $_POST['quantidade'];
    $peso_item = $_POST['peso'];
    $data_validade = $_POST['validade'];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare('UPDATE lote_doacao');
    $stmt->bind_param('si', $nome, $id);
} else {
    $stmt = $conexao->prepare('INSERT INTO lote_doacao');
    $stmt->bind_param("s", $nome);
}

$stmt->execute();

if ($stmt->affected_rows == 1) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Categoria atualizada com sucesso!';
    $retorno['data'] = $conexao->insert_id;
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Não foi possivel atualizar a categoria.';
}

$stmt->close();
$conexao->close();

header('Content-type: application/json;charset=utf-8');
echo json_encode($retorno);