<?php
global $conexao;
include_once('../conexao.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if (isset($_GET['id'])) {
    $id_categoria = $_GET['id'];

    $stmt = $conexao->prepare('DELETE FROM categorias WHERE id = ?');
    $stmt->bind_param('i', $id_categoria);
    $stmt->execute();

    if ($stmt->affected_rows == 1) {
        $retorno['status'] = 'ok';
        $retorno['mensagem'] = 'Categoria e itens relacionados excluídos com sucesso';
    } else {
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Não foi possível excluir a categoria (ID não encontrado ou erro)';
    }

    $stmt->close();
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'É necessário informar o id';
}

$conexao->close();

header('Content-type: application/json;charset=utf-8');
echo json_encode($retorno);