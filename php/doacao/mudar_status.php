<?php
global $conexao;
include '../conexao.php';

$id = $_GET['id'];
$status = $_GET['status'];

if ($status == 'disponivel') {
    $stmt = $conexao->prepare(
        'UPDATE 
            doacoes
        SET 
            status = "disponivel",
            id_receptor = NULL,
            id_motorista = NULL
        WHERE 
            id = ?'
    );
    $stmt->bind_param('i', $id);
} elseif ($status == 'aceita') {
    $idReceptor = $_GET['id-receptor'];
    $stmt = $conexao->prepare(
        'UPDATE 
            doacoes
        SET 
            status = "aceita",
            id_receptor = ?,
            id_motorista = NULL
        WHERE 
            id = ?'
    );
    $stmt->bind_param('ii', $idReceptor, $id);
} elseif ($status == 'em-transito') {
    $idMotorista = $_GET['id-motorista'];
    $stmt = $conexao->prepare(
        'UPDATE 
            doacoes 
        SET 
            status = "em transito",
            id_receptor = ?
        WHERE 
            id = ?'
    );
    $stmt->bind_param('ii', $idMotorista, $id);
} elseif ($status == 'concluida') {
    $stmt = $conexao->prepare(
        'UPDATE
            doacoes
        SET
            status = "concluida"
        WHERE
            id = ?'
    );
    $stmt->bind_param('i', $id);
}

$stmt->execute();
$stmt->close();
$conexao->close();