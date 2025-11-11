const formCategoria = document.getElementById('formulario-categoria');
const formAlimento = document.getElementById('formulario-alimento');
let idCategoria = new URLSearchParams(window.location.search).get('id');
const tabela = document.getElementById('tabela');
const corpoTabela = document.getElementById('corpo-tabela');
let idAlimento = null;
const botao_voltar = document.getElementById("botao_voltar")

    
if (idCategoria) {
    completarFormularioCategoria(idCategoria);
    carregarDados();
    tabela.style.opacity = '1';
    formAlimento.style.opacity = '1';
}

formCategoria.addEventListener('submit', (event) => {
    event.preventDefault();
    salvarCategoria();
});

async function salvarCategoria() {
    const data = new FormData(formCategoria);
    let url = '../php/categoria/save.php'
    if (idCategoria) {
        url += `?id=${idCategoria}`;
    }
    const retorno = await fetch(url, {
        method: 'POST',
        body: data
    });
    const resposta = await retorno.json();
    if (!idCategoria) {
        idCategoria = resposta.data;
        window.location.href = document.location.href+`?id=${idCategoria}`;
    } else {
        window.location.href = "../categoria/index.html"
    }
}

async function completarFormularioCategoria(id) {
    const retorno = await fetch(`../php/categoria/get.php?id=${id}`);
    const resposta = await retorno.json();

    const categoria = resposta.data[0]
    for (const key in categoria) {
        if (formCategoria[key]) {
            formCategoria[key].value = categoria[key];
        }
    }
}

botao_voltar.addEventListener("click", () => {
    window.location.href = '../categoria/index.html';
});

//ALIMENTOS//
//--------------------------------------------------------------------------------------------//

async function carregarDados() {
    const retorno = await fetch(`../php/alimento/get.php?id-categoria=${idCategoria}`);
    const resposta = await retorno.json();
    if (resposta.status === "ok") {
        const alimentos = resposta.data;
        let html = '';
        for (let alimento of alimentos) {
            html += `<tr>
                        <td>${alimento.nome}</td>
                        <td>
                            <a class="btn btn-secondary btn-sm" href='javascript:completarFormularioAlimento(${alimento.id})'>Alterar</a>
                            <a class="btn btn-danger btn-sm" href='javascript:excluir(${alimento.id})'>Excluir</a>
                        </td>
                    </tr>`;
        }
        corpoTabela.innerHTML += html
    }
}

async function excluir(idAlimento) {
    const retorno = await fetch("../php/alimento/delete.php?id="+idAlimento);
    const resposta = await retorno.json();
    if(resposta.status === "ok"){
        window.location.reload();
    }else{
        alert("ERRO:" + resposta.mensagem);
    }
}


async function salvarAlimento() {
    const data = new FormData(formAlimento);
    let url = '../php/alimento/save.php';
    if (idAlimento) {
        url += `?id=${idAlimento}`;
    }
    else{
        url += `?id-categoria=${idCategoria}`;
    }
    const retorno = await fetch(url, {
        method: 'POST',
        body: data
    });
    const resposta = await retorno.json();
    console.log(resposta);
    window.location.reload()
}


async function completarFormularioAlimento(id) {
    idAlimento = id;
    const retorno = await fetch(`../php/alimento/get.php?id=${id}`);
    const resposta = await retorno.json();

    const alimento = resposta.data[0]
    for (const key in alimento) {
        if (formAlimento[key]) {
            formAlimento[key].value = alimento[key];
        }
    }
}

formAlimento.addEventListener("submit", (event) => {
    event.preventDefault();
    salvarAlimento();
});

formAlimento.addEventListener("reset", () => {
    idAlimento = null;
});