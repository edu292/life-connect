<?php
global $conexao;
include_once 'conexao.php';

$retorno = [
    'status' => '',   // ok ou nok
    'mensagem' => '', // mensagem sucesso ou erro
    'data' => []      // efetivamente o retorno
];

$stmt = $conexao->prepare('SELECT * FROM usuarios WHERE email = ? AND senha = ?');
$stmt->bind_param('ss', $_POST['email'], $_POST['senha']);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows == 1) {
    $usuario = $resultado->fetch_assoc(); //le a linha retornada como um array
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Registro encontrado';
    $retorno['data'] = $usuario;
    session_start();
    $_SESSION['usuario'] = $usuario;
} else {    
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Nenhum registro encontrado';
    $retorno['data'] = [];
}

$stmt->close();
$conexao->close();

header('Content-type: application/json;charset=utf-8');
echo json_encode($retorno); // converte pra json  