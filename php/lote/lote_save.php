<?php
global $conexao;
include_once('../conexao.php');

$retorno = [
    'status' => '',   
    'mensagem' => '', 
    'data' => []      
];


$id_alimento = $_POST['id_alimento'];
$quantidade = $_POST['quantidade'];
$peso_item = $_POST['peso'];
$data_validade = $_POST['validade'];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare("
        UPDATE lote_doacao 
        SET id_alimento = ?, quantidade = ?, peso_item = ?, data_validade = ?
        WHERE id = ?
    ");
    $stmt->bind_param("iidsi", $id_alimento, $quantidade, $peso_item, $data_validade, $id);
} else {
    $idDoacao = $_GET['idDoacao'];
    $stmt = $conexao->prepare("
        INSERT INTO lote_doacao (id_doacao, id_alimento, quantidade, peso_item, data_validade)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("iiids", $idDoacao, $id_alimento, $quantidade, $peso_item, $data_validade);
}

if ($stmt->execute()) {
    if ($stmt->affected_rows >= 0) {
        $retorno['status'] = 'ok';
        $retorno['mensagem'] = 'Lote atualizado/inserido com sucesso';
    } else {
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Nenhum registro foi afetado';
    }
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Erro ao executar SQL: ' . $stmt->error;
}

$stmt->close();
$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
?>
