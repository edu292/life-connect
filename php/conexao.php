<?php
$servidor = "localhost:3307";
$usuario = "root";
$senha = "";
$banco = "life_connect";

$conexao = new mysqli($servidor, $usuario, $senha, $banco);

if ($conexao->connect_error) {
    echo $conexao->connect_error;
}