const formDoacao = document.getElementById('formulario-doacao');
const formLote = document.getElementById('formulario-lote');
const tabela = document.getElementById('tabela');
const corpoTabela = document.getElementById('corpo-tabela');
let idDoacao = new URLSearchParams(window.location.search).get('id');
let idLote = null;


if (idDoacao) {
    completarFormularioDoacao(idDoacao);
    carregarDados();
    tabela.style.opacity = '1'; 
    formLote.style.opacity = '1';
}

formDoacao.addEventListener('submit', (event) => {
    event.preventDefault();
    salvarDoacao();
});

async function salvarDoacao() {
    const data = new FormData(formDoacao);
    let url = '../php/doacao/save.php'
    if (idDoacao) {
        url += `?id=${idDoacao}`;
    } else {
        data.append('id-doador', localStorage.getItem('id'))
    }
    const retorno = await fetch(url, {
        method: 'POST',
        body: data
    });
    const resposta = await retorno.json();
    if (!idDoacao) {
        idDoacao = resposta.data;
        window.location.href = document.location.href+`?id=${idDoacao}`;
    } else {
        window.location.href = "../home/doador.html"
    }
}

async function carregarAlimentos() {
    const url = '../php/alimento/get.php';
    const retorno = await fetch(url);
    const resposta = await retorno.json();
    let opcoes = '<option value="" disabled selected>-- Selecione um Alimento --</option>';

    if (resposta.status === 'ok' && resposta.data.length > 0) {
        resposta.data.forEach(alimento => {
            opcoes += `
                <option value="${alimento.id}">${alimento.nome}</option>
            `;
        });
    }

    formLote.id_alimento.innerHTML = opcoes;
}
carregarAlimentos(); 


async function completarFormularioDoacao(id) {
    const retorno = await fetch(`../php/doacao/get.php?id=${id}`);
    const resposta = await retorno.json();

    const doacao = resposta.data[0]
    for (const key in doacao) {
        if (formDoacao[key]) {
            formDoacao[key].value = doacao[key];
        }
    }
}

//LOTES DE DOAÇÃO//
//--------------------------------------------------------------------------------------------//

async function carregarDados() {
    const retorno = await fetch(`../php/lote/get.php?id-doacao=${idDoacao}`);
    const resposta = await retorno.json();
    if (resposta.status === "ok") {
        const lotes = resposta.data;
        let html = '';
        for (let lote of lotes) {
            html += `<tr>
                        <td>${lote.nome}</td>
                        <td>${lote.quantidade}</td>
                        <td>${lote.peso_total}</td>
                        <td>${lote.data_validade}</td>
                        <td>
                            <a class="btn btn-secondary btn-sm" href='javascript:completarFormularioLote(${lote.id})'>Alterar</a>
                            <a class="btn btn-danger btn-sm" href='javascript:excluir(${lote.id})'>Excluir</a>
                        </td>
                    </tr>`;
        }
        corpoTabela.innerHTML += html
    }
}

async function excluir(idLote) {
    const retorno = await fetch("../php/lote/delete.php?id="+idLote);
    const resposta = await retorno.json();
    if(resposta.status === "ok"){
        window.location.reload();
    }else{
        alert("ERRO:" + resposta.mensagem);
    }
}


async function salvarLote() {
    const data = new FormData(formLote);
    let url = '../php/lote/save.php';
    if (idLote) {
        url += `?id=${idLote}`;
    }
    else{
        url += `?id-doacao=${idDoacao}`;
    }
    const retorno = await fetch(url, {
        method: 'POST',
        body: data
    });
    const resposta = await retorno.json();
    console.log(resposta);
    window.location.reload()
}


async function completarFormularioLote(id) {
    idLote = id;
    const retorno = await fetch(`../php/lote/get.php?id=${id}`);
    const resposta = await retorno.json();

    const lote = resposta.data[0]
    for (const key in lote) {
        if (formLote[key]) {
            formLote[key].value = lote[key];
        }
    }
}

formLote.addEventListener("submit", (event) => {
    event.preventDefault();
    salvarLote();
});

formLote.addEventListener('reset', () => {
    idLote = null;
});