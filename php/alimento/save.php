<?php
global $conexao;
include_once('../conexao.php');

$retorno = [
    'status' => '',   // ok ou nok
    'mensagem' => '', // mensagem sucesso ou erro
    'data' => []      // efetivamente o retorno
];

$nome = $_POST['nome'];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare('UPDATE alimentos SET nome = ? WHERE id = ?');
    $stmt->bind_param('si', $nome, $id);
} else {
    $idCategoria = $_GET['id-categoria'];
    $stmt = $conexao->prepare('INSERT INTO alimentos (nome, id_categoria) VALUES (?, ?)');
    $stmt->bind_param("si", $nome, $idCategoria);
}

$stmt->execute();

if ($stmt->affected_rows == 1) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Alimento atualizado com sucesso';
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Não foi possivel atualizar o alimento';
}

$stmt->close();
$conexao->close();

header('Content-type: application/json;charset=utf-8');
echo json_encode($retorno);