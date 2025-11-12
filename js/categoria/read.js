async function excluir(id) {
    const resposta = await fetch(`../php/categoria/delete.php?id=${id}`);
    const retorno = await resposta.json();
    if (retorno.status === 'ok') {
        window.location.reload();
    } else {
        alert('ERRO: ' + retorno.mensagem)
    }
}

async function carregarDados() {
    const resposta = await fetch('../php/categoria/get.php')
    const retorno = await resposta.json();
    const categorias = retorno.data

    let html = ''
    for (const categoria of categorias) {
        const contadorResposta = await fetch(`../php/alimento/get.php?id-categoria=${categoria.id}&contar=true`);
        const contadorRetorno = await contadorResposta.json();
        const contador = contadorRetorno.data[0].quantidade;
        html += `
            <tr>
                <td>${categoria.nome}</td>
                <td class="text-center">${contador}</td>
                <td class="text-center">${categoria.instagram}</td>
                <td class="text-center">
                    <a href="../categoria/formulario.html?id=${categoria.id}" class="btn btn-sm btn-outline-primary me-2">Alterar</a>
                    <a href="javascript:excluir(${categoria.id})" class="btn btn-sm btn-outline-danger">Excluir</a>
                </td>
            </tr>
        `
    }
    tabela.innerHTML = html;
}

const tabela = document.getElementById('tabela');
carregarDados();

