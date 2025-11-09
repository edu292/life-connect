<?php
global $conexao;
include_once('../conexao.php');
header('Content-type: application/json;charset=utf-8');

$retorno = [
    'status' => '',
    'mensagem' => 'Erro desconhecido ao processar a doação.',
    'data' => null
];

if (!isset($_POST['nome-doacao'])) {
    $retorno['mensagem'] = 'Campo "nome-doacao" não foi enviado.';
    echo json_encode($retorno);
    exit;
}

$nome = $_POST['nome-doacao'];
$execucao_ok = false;

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare('UPDATE doacao SET nome = ? WHERE id = ?');
    $stmt->bind_param('si', $nome, $id);

    // Executa e verifica
    if ($stmt->execute()) {
        $execucao_ok = true;
    }

} else {

    $stmt = $conexao->prepare('INSERT INTO doacao (nome) VALUES (?)');
    $stmt->bind_param("s", $nome);


    if ($stmt->execute()) {
        $execucao_ok = true;
    }
}


if ($execucao_ok) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Doação salva com sucesso.';

    // INSERT
    if (!isset($_GET['id'])) {
        $retorno['data'] = $conexao->insert_id;
    } else {
        // UPDATE
        $retorno['data'] = $id;
    }
} else {
    // Capturar o erro do MySQL para ajudar no debug
    $retorno['mensagem'] = 'Não foi possível salvar a doação: ' . $stmt->error;
}

$stmt->close();
$conexao->close();

echo json_encode($retorno);
