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
    $stmt = $conexao->prepare('UPDATE doacao SET nome = ? WHERE id = ?');
    $stmt->bind_param('si', $nome, $id);
} else {
    $stmt = $conexao->prepare('INSERT INTO doacao (nome) VALUES (?)');
    $stmt->bind_param("s", $nome);
}

$stmt->execute();

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