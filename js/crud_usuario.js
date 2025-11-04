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
    if(resposta.status == "ok"){
        window.location.href = '../login/';
    }else{
        alert("falha ao efetuar logff")
    }
}

async function carregarDados() {
    const retorno = await fetch("../php/crud_usuario.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        let html = `<table>
        <tr>
            <td>cpf_cnpj</td>
            <td>Nome</td>
            <td>Email</td>
            <td>Senha</td>
            <td>Tipo</td>
            <td>#</td>
        </tr>`;
        const registros = resposta.data;
        for (let i = 0; i < registros.length; i++) {
            let objeto = registros[i];
            html += `<tr>
                        <td>${objeto.cpf_cnpj}</td>
                        <td>${objeto.nome}</td>
                        <td>${objeto.email}</td>
                        <td>${objeto.senha}</td>
                        <td>${objeto.tipo}</td>
                        <td>
                        <a href = 'projeto_final_alterar.html?id=${objeto.id}'>Alterar</a>
                        <a href = '#' onclick = 'excluir(${objeto.id})'>Excluir</a>
                        
                        </td>
                    </tr>`;
        }
        html+= "</table>";
        document.getElementById("lista").innerHTML += html
    } else {
        alert("Erro:" + resposta.mensagem);
    };
};

async function excluir(id) {
    const retorno = await fetch("../php/projeto_final_excluir.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert(resposta.mensagem);
        window.location.reload(); //recarrega a apgina
    }else{
        alert("ERRO:" + resposta.mensagem);
    }
};