async function excluir(id) {
    const resposta = await fetch(`../php/categoria_delete.php?id=${id}`);
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
    const categorias = retorno.data

    let html = ''
    for (const categoria of categorias) {
        const contadorResposta = await fetch(`../php/alimento_get.php?id-categoria=${categoria.id}&contar=true`);
        const contadorRetorno = await contadorResposta.json();
        const contador = contadorRetorno.data[0].quantidade;
        html += `
            <tr>
                <td>${categoria.nome}</td>
                <td>${contador}</td>
                <td>
                    <a href="../categorias/formulario.html?id=${categoria.id}">Alterar</a>
                    <a href="javascript:excluir(${categoria.id})">Excluir</a>
                </td>
            </tr>
        `
    }
    tabela.innerHTML = html;
}

const tabela = document.getElementById('tabela');
carregarDados();

