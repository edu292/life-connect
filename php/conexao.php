<?php
$servidor = "localhost:3307";
$usuario = "root";
$senha = "1m0pdrtv";
$banco = "life_connect";

$conexao = new mysqli($servidor, $usuario, $senha, $banco);

if ($conexao->connect_error) {
    echo $conexao->connect_error;
}