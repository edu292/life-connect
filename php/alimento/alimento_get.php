<?php
global $conexao;
include_once '../conexao.php';

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if (isset($_GET['id-categoria'])) {
    $id_categoria = $_GET['id-categoria'];

    if (isset($_GET['contar'])) {
        $stmt = $conexao->prepare("SELECT COUNT(*) AS quantidade FROM alimentos WHERE id_categoria = ?");
    } else {
        $stmt = $conexao->prepare("SELECT * FROM alimentos WHERE id_categoria = ?");
    }

    $stmt->bind_param("i", $id_categoria);
} else if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare("SELECT * FROM alimentos WHERE id = ?");
    $stmt->bind_param("i", $id);
} else {
    $stmt = $conexao->prepare("SELECT * FROM alimentos");
}

$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $tabela = $resultado->fetch_all(MYSQLI_ASSOC);

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Registros encontrados',
        'data' => $tabela
    ];
} else {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Nenhum registro encontrado',
        'data' => []
    ];
}

$stmt->close();
$conexao->close();

header("Content-type:application/json;charset:utf-8");
echo json_encode($retorno);
