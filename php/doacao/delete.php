<?php
global $conexao;
include_once '../conexao.php';

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // 1. INÍCIO DA TRANSAÇÃO
    $conexao->begin_transaction(); 
    // 2. EXCLUIR OS REGISTROS FILHOS (LOTES)
    $stmt_filhos = $conexao->prepare('DELETE FROM lotes_doacao WHERE id_doacao = ?');
    $stmt_filhos->bind_param('i', $id);
    $stmt_filhos->execute();
    $stmt_filhos->close();

    // 3. EXCLUIR O REGISTRO PAI (DOACAO)
    $stmt_pai = $conexao->prepare('DELETE FROM doacoes WHERE id = ?');
    $stmt_pai->bind_param('i', $id);
    $stmt_pai->execute();

    if ($stmt_pai->affected_rows == 1) {
        $conexao->commit();
        $retorno['status'] = 'ok';
        $retorno['mensagem'] = 'Categoria e itens relacionados excluídos com sucesso';
    } else {
        // Se a doacao não foi encontrada/excluída, DESFAZ tudo
        $conexao->rollback();
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Não foi possível excluir a categoria';
    }

    $stmt_pai->close();

} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'É necessário informar o id';
}

$conexao->close();

header('Content-type: application/json;charset=utf-8');
echo json_encode($retorno);