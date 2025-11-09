<?php
global $conexao;
include_once('../conexao.php');

$retorno = [
    'status' => '',   
    'mensagem' => '', 
    'data' => []      
];


$idAlimento = $_POST['id_alimento'];
$quantidade = $_POST['quantidade'];
$pesoUnidade = $_POST['peso_unidade'];
$dataValidade = $_POST['data_validade'];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare("
        UPDATE lote_doacao 
        SET id_alimento = ?, quantidade = ?, peso_unidade = ?, data_validade = ?
        WHERE id = ?
    ");
    $stmt->bind_param("iidsi", $idAlimento, $quantidade, $pesoUnidade, $dataValidade, $id);
} else if (isset($_GET['id-doacao'])) {
    $idDoacao = $_GET['id-doacao'];
    $stmt = $conexao->prepare("
        INSERT INTO lote_doacao (id_doacao, id_alimento, quantidade, peso_unidade, data_validade)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("iiids", $idDoacao, $idAlimento, $quantidade, $pesoUnidade, $dataValidade);
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'É necesário informar o id do lote ou o id da sua respective doacao';
}

$stmt->execute();

if ($stmt->affected_rows == 1) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Lote atualizado/inserido com sucesso';
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Nenhum registro foi afetado';
}


$stmt->close();
$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
?>
