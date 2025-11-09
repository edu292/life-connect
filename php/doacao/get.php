<?php
global $conexao;
include_once('../conexao.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare('SELECT * FROM doacoes WHERE id = ?');
    $stmt->bind_param('i', $id);
} elseif (isset($_GET['status'])) {
    $status = $_GET['status'];
    $stmt = $conexao->prepare("SELECT * FROM doacoes WHERE status = ?");
    $stmt->bind_param('s', $status);
} elseif (isset($_GET['id-doador'])) {
    $idDoador = $_GET['id-doador'];
    $stmt = $conexao->prepare("SELECT * FROM doacoes WHERE id_doador = ?");
    $stmt->bind_param('i', $idDoador);
} elseif (isset($_GET['id-receptor'])) {
    $idReceptor = $_GET['id-receptor'];
    $stmt = $conexao->prepare("SELECT * FROM doacoes WHERE id_receptor = ?");
    $stmt->bind_param('i', $idReceptor);
} elseif (isset($_GET['id-motorista'])) {
    $idMotorista = $_GET['id-motorista'];
    $stmt = $conexao->prepare("SELECT * FROM doacoes WHERE id_motorista = ?");
    $stmt->bind_param('i', $idMotorista);
} else {
    $stmt = $conexao->prepare("SELECT * FROM doacoes");
}

$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $tabela = $resultado->fetch_all(MYSQLI_ASSOC);

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Doações encontrados',
        'data' => $tabela
    ];
} else {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Nenhuma doação encontrada',
        'data' => []
    ];
}

$stmt->close();
$conexao->close();

header("Content-type:application/json;charset:utf-8");
echo json_encode($retorno);
