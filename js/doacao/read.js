async function excluir(id) {
    const resposta = await fetch(`../php/doacao/delete.php?id=${id}`);
    const retorno = await resposta.json();
    if (retorno.status === 'ok') {
        window.location.reload();
    } else {
        alert('ERRO: ' + retorno.mensagem)
    }
}

async function carregarDados() {
    const idDoador = localStorage.getItem('id');
    const resposta = await fetch(`../php/doacao/get.php?id-doador=${idDoador}`)
    const retorno = await resposta.json();
    const doacoes = retorno.data;

    let html = ''
    for (const doacao of doacoes) {
        html += `
            <tr>
                <td>${doacao.titulo}</td>
                <td>${doacao.status}</td>
                <td>
                    <a href="../doacao/formulario.html?id=${doacao.id}">Alterar</a>
                    <a href="javascript:excluir(${doacao.id})">Excluir</a>
                </td>
            </tr>
        `
    }
    tabela.innerHTML = html;
}

const tabela = document.getElementById('tabela');
carregarDados();