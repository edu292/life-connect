<?php
global $conexao;
include_once 'conexao.php';

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if (isset($_GET['id'])) {
    $id_categoria = $_GET['id'];

    // 1. INÍCIO DA TRANSAÇÃO
    $conexao->begin_transaction(); 

    try {
        // 2. EXCLUIR OS REGISTROS FILHOS (ALIMENTOS)
        $stmt_filhos = $conexao->prepare('DELETE FROM alimentos WHERE id_categoria = ?');
        $stmt_filhos->bind_param('i', $id_categoria);
        $stmt_filhos->execute();
        $stmt_filhos->close();

        // 3. EXCLUIR O REGISTRO PAI (CATEGORIA)
        $stmt_pai = $conexao->prepare('DELETE FROM categorias WHERE id = ?');
        $stmt_pai->bind_param('i', $id_categoria);
        $stmt_pai->execute();

        if ($stmt_pai->affected_rows == 1) {
            // 4. Se tudo correu bem, CONFIRMA a transação
            $conexao->commit();
            $retorno['status'] = 'ok';
            $retorno['mensagem'] = 'Categoria e itens relacionados excluídos com sucesso';
        } else {
            // Se a categoria não foi encontrada/excluída, DESFAZ tudo
            $conexao->rollback();
            $retorno['status'] = 'nok';
            $retorno['mensagem'] = 'Não foi possível excluir a categoria (ID não encontrado ou erro)';
        }

        $stmt_pai->close();

    } catch (Exception $e) {
        // 5. Em caso de qualquer erro, DESFAZ a transação e informa o erro
        $conexao->rollback();
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Erro ao excluir: ' . $e->getMessage();
    }

} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'É necessário informar o id';
}

$conexao->close();

header('Content-type: application/json;charset=utf-8');
echo json_encode($retorno);