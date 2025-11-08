const formDoacao = document.getElementById('formulario-doacao');
const tabela = document.getElementById('tabela');
const corpoTabela = document.getElementById('corpo-tabela');
const botaoVoltar = document.getElementById('botao_voltar');
let id_lote = '';
let id_entrega = '';
let id_alimento = '';


formDoacao.addEventListener('submit', (event) => {
    event.preventDefault();
    salvarDoacao();
});

async function salvarDoacao() {

    const data = new FormData(formDoacao);
    let url = '../php/doacao_save.php'
    const retorno = await fetch(url, {
        method: 'POST',
        body: data
    });

    const resposta = await retorno.json();
}



