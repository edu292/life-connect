<?php
global $conexao;
include_once('../conexao.php');

$retorno = [
    'status' => '',   // ok ou nok
    'mensagem' => '', // mensagem sucesso ou erro
    'data' => []      // efetivamente o retorno
];

if (isset($_GET['id'])) {
    $stmt = $conexao->prepare('DELETE FROM lotes_doacao WHERE id = ?');
    $stmt->bind_param('i', $_GET['id']);
    $stmt->execute();

    if ($stmt->affected_rows == 1) {
        $retorno['status'] = 'ok';
        $retorno['mensagem'] = 'Lote excluido com sucesso';
    } else {
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Não foi possivel excluir o lote';
    }

    $stmt->close();
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'É necessário informar o id';
}

$conexao->close();

header("Content-type:application/json;charset:utf-8");
echo json_encode($retorno);
