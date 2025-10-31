<?php
global $conexao;
include_once 'conexao.php';

$retorno = [
    'status' => '',   // ok ou nok
    'mensagem' => '', // mensagem sucesso ou erro
    'data' => []      // efetivamente o retorno
];

$nome = $_POST['nome'];
$email = $_POST['email'];
$cpf_cnpj = $_POST['cpf_cnpj'];
$senha = $_POST['senha'];
$rua = $_POST['rua'];
$numero = $_POST['numero'];
$bairro = $_POST['bairro'];
$cidade = $_POST['cidade'];
$cep = $_POST['cep'];
$tipo = $_POST['tipo'];

$stmt = $conexao->prepare('INSERT INTO usuarios (nome, email, cpf_cnpj, senha, rua, numero, bairro, cidade, cep, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
$stmt->bind_param(
    "sssssissss",
    $nome,
    $email,
    $cpf_cnpj,
    $senha,
    $rua,
    $numero,
    $bairro,
    $cidade,
    $cep,
    $tipo
);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Usuário criado com sucesso';
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Não foi possivel criar o usuário';
}

$stmt->close();
$conexao->close();

header('Content-type: application/json;charset=utf-8');
echo json_encode($retorno);
