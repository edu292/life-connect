<?php
$retorno = [
    'status' => '',   // ok ou nok
    'mensagem' => '', // mensagem sucesso ou erro
    'data' => []      // efetivamente o retorno
];

session_start();
if (isset($_SESSION['usuario'])) { //se a variável usuario existir (vindo do login)
    $retorno['status'] = 'ok';
    $retorno['data'] = $_SESSION['usuario'];
} else {
    $retorno['status'] = 'nok';
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);