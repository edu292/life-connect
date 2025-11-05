async function excluir(id) {
    const resposta = await fetch(`../php/categoria_delete?id=${id}`);
    const retorno = await resposta.json();
    if (retorno.status === 'ok') {
        window.location.reload();
    } else {
        alert('ERRO: ' + retorno.mensagem)
    }
}

async function carregarDados() {
    const resposta = await fetch('../php/categoria_get.php')
    const retorno = await resposta.json();

    let html = ''
    for (const categoria of retorno) {
        html += `
            <tr>
                <td>${categoria.nome}</td>
                <td>Conta ae mermão</td>
                <td>
                    <a href="../categorias/formulario.html?${categoria.id}">Alterar</a>
                    <a href="javascript:excluir(${categoria.id})">Excluir</a>
                </td>
            </tr>
        `
    }
}


const botaoNovo = document.getElementById('botao-novo');
const tabela = document.getElementById('tabela');

