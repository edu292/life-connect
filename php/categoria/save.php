<?php
global $conexao;
include_once('../conexao.php');
header('Content-type: application/json;charset=utf-8');
$retorno = [
    'status' => '',   // ok ou nok
    'mensagem' => '', // mensagem sucesso ou erro
    'data' => []      // efetivamente o retorno
];

$nome = $_POST['nome'];
$instagram = $_POST['instagram'];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare('UPDATE categorias SET nome = ?, instagram = ? WHERE id = ?');
    $stmt->bind_param('ssi', $nome, $instagram, $id);
} else {
    $stmt = $conexao->prepare('INSERT INTO categorias (nome, instagram) VALUES (?, ?)');
    $stmt->bind_param("ss", $nome, $instagram);
}

$stmt->execute();

if ($stmt->affected_rows == 1) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Categoria atualizada/inserida com sucesso';
    $retorno['data'] = $conexao->insert_id;
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Não foi possivel atualizar/inserir a categoria';
}

$stmt->close();
$conexao->close();


echo json_encode($retorno);