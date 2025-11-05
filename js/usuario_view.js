const tabela = document.getElementById('tabela');
carregarDados();

document.getElementById("novo").addEventListener("click", () =>{
    window.location.href = '../cadastro/index.html'
})
document.getElementById("logoff").addEventListener("click", () =>{
    logoff();
});

async function logoff() {
    const retorno = await fetch ("../php/logoff.php")
    const resposta = await retorno.json();
    if(resposta.status === "ok"){
        window.location.href = '../login/';
    }else{
        alert("falha ao efetuar logoff")
    }
}

async function carregarDados() {
    const retorno = await fetch("../php/usuario_get.php");
    const resposta = await retorno.json();
    if (resposta.status === "ok") {
        const usuarios = resposta.data;
        let html = '';
        for (let usuario of usuarios) {
            html += `<tr>
                        <td>${usuario.cpf_cnpj}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.senha}</td>
                        <td>${usuario.tipo}</td>
                        <td>
                            <a class="btn btn-secondary btn-sm" href = '../cadastro/index.html?id=${usuario.id}'>Alterar</a>
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
    const retorno = await fetch("../php/usuario_delete.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status === "ok"){
        window.location.reload();
    }else{
        alert("ERRO:" + resposta.mensagem);
    }
}