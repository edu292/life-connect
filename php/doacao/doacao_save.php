<?php
include_once('../conexao.php');

$retorno = [
    'status' => '', 
    'mensagem' => '',
    'data' => []
];


$nome = $_POST['nome-doacao'];


if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare('UPDATE doacao SET nome = ? WHERE id = ?');
    $stmt->bind_param('si', $nome, $id);
} else {
    $stmt = $conexao->prepare('INSERT INTO categorias (nome, ) VALUES (?)');
    $stmt->bind_param("s", $nome);
}

if ($stmt->affected_rows == 1) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Doação atualizada/inserida com sucesso';
    $retorno['data'] = $conexao->insert_id;
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Não foi possivel atualizar/inserir a doação';
}

$stmt->close();
$conexao->close();

header('Content-type: application/json;charset=utf-8');
echo json_encode($retorno);