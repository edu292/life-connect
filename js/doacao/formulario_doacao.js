const formDoacao = document.getElementById('formulario-doacao');
const formLote = document.getElementById('formulario-lote');
const tabela = document.getElementById('tabela');
const corpoTabela = document.getElementById('corpo-tabela');
const botaoVoltar = document.getElementById('botao_voltar');
const selectAlimento = document.getElementById('id_alimento'); 
let idDoacao = new URLSearchParams(window.location.search).get('id');


if (idDoacao) {
    completarFormularioDoacao(idDoacao);
    //carregarDados(); Como ainda não tem o CRUD de Lotes, essa função não existe no codigo ainda
    tabela.style.opacity = '1'; // tabela não carrega pois não existe
    formLote.style.opacity = '1';
}

formDoacao.addEventListener('submit', (event) => {
    event.preventDefault();
    salvarDoacao();
});

async function salvarDoacao() {
    const data = new FormData(formDoacao);
    let url = '../php/doacao/doacao_save.php'
    if (idDoacao) {
        url += `?id=${idDoacao}`;
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
        window.location.href = "../../doacao/formulario.html"
    }
}


async function carregarAlimentos() {
    const url = '../php/alimento/alimento_get.php'; 
    const retorno = await fetch(url);
    const resposta = await retorno.json();
    let opcoes = '<option value="" disabled selected>-- Selecione um Alimento --</option>';

    if (resposta.status === 'ok' && resposta.data.length > 0) {
        resposta.data.forEach(alimento => {
            opcoes += `
                <option value="${alimento.id}">${alimento.nome}</option>
            `;
        });
    } else {
        opcoes = '<option value="" disabled selected>Nenhum alimento encontrado</option>';
    }

    selectAlimento.innerHTML = opcoes;
}
carregarAlimentos(); 


async function completarFormularioDoacao(id) {
    const retorno = await fetch(`../php/doacao/doacao_get.php?id=${id}`);
    const resposta = await retorno.json();

    const doacao = resposta.data[0]
    for (const key in doacao) {
        if (formDoacao[key]) {
            formDoacao[key].value = doacao[key];
        }
    }
}

botao_voltar.addEventListener("click", () => {
    window.location.href = '../doacao/index.html';
});


//LOTES DE DOAÇÃO//
//--------------------------------------------------------------------------------------------//

