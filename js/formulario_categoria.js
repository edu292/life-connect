const formCategoria = document.getElementById('formulario-categoria');
const formAlimento = document.getElementById('formulario-alimento');
const idCategoria = new URLSearchParams(window.location.search).get('id');
const tabela = document.getElementById('tabela');

if (idCategoria) {
    completarFormularioCategoria(idCategoria);
    carregarDados();
}

formCategoria.addEventListener('submit', (event) => {
    event.preventDefault();
    salvarCategoria();
});

async function salvarCategoria() {
    const data = new FormData(formCadastro);
    let url = '../php/cadastro.php';
    if (idUsuario) {
        url += `?id=${idUsuario}`;
    }
    const retorno = await fetch(url, {
        method: 'POST',
        body: data,
    });
    const resposta = await retorno.json();
    console.log(resposta);
    window.location.href = document.referrer;
}

async function completarFormularioCategoria(id) {
    const retorno = await fetch(`../php/categoria_get.php?id=${id}`);
    const resposta = await retorno.json();

    const usuario = resposta.data[0]
    console.log(usuario);
    for (const key in usuario) {
        if (formCadastro[key]) {
            formCadastro[key].value = usuario[key];
        }
    }
}

function carregarDados() {

}