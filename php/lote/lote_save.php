<?php
global $conexao;
include_once('../conexao.php');
$retorno = [
    'status' => '',   // ok ou nok
    'mensagem' => '', // mensagem sucesso ou erro
    'data' => []      // efetivamente o retorno
];

$id_alimento = $_POST['id_alimento'];
$quantidade = $_POST['quantidade'];
$peso_item = $_POST['peso'];
$data_validade = $_POST['validade'];
$idDoacao = $_GET['idDoacao'];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare("
    UPDATE lote_doacao 
    SET id_alimento = ?, quantidade = ?, peso_item = ?, data_validade = ?
    WHERE id = ?
    ");
    $stmt->bind_param("iidsi", $id_alimento, $quantidade, $peso_item, $data_validade, $id);
} else {
    $stmt = $conexao->prepare("
    INSERT INTO lote_doacao (id_doacao, id_alimento, quantidade, peso_item, data_validade)
    VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("iiids", $idDoacao, $id_alimento, $quantidade, $peso_item, $data_validade);
}

$stmt->execute();

if ($stmt->affected_rows == 1) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Lote atualizado/inserido com sucesso';
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Não foi possivel atualizar/inserir o lote';
}

$stmt->close();
$conexao->close();

header("Content-type:application/json;charset:utf-8");
echo json_encode($retorno);