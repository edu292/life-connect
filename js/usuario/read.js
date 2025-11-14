const tabela = document.getElementById('tabela');
carregarDados();

async function carregarDados() {
    const retorno = await fetch("../php/usuario/get.php");
    const resposta = await retorno.json();
    if (resposta.status === "ok") {
        const usuarios = resposta.data;
        let html = '';
        for (let usuario of usuarios) {
            html += `<tr>
                        <td>${usuario.cpf_cnpj}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.nome_mae}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.senha}</td>
                        <td>${usuario.tipo}</td>
                        <td>
                            <a class="btn btn-secondary btn-sm" href = '../usuario/formulario.html?id=${usuario.id}'>Alterar</a>
                            <a class="btn btn-danger btn-sm" href = '#' onclick = 'excluir(${usuario.id})'>Excluir</a>
                        </td>
                    </tr>`;
        }
        tabela.innerHTML += html
    } else {
        alert("Erro:" + resposta.mensagem);
    }
}

async function excluir(id) {
    const retorno = await fetch("../php/usuario/delete.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status === "ok"){
        window.location.reload();
    }else{
        alert("ERRO:" + resposta.mensagem);
    }
}