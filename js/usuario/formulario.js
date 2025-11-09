const formCadastro = document.getElementById('cadastro');
const idUsuario = new URLSearchParams(window.location.search).get('id');

if (idUsuario) {
    completarFormulario(idUsuario);
}

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    cadastro();
})

async function cadastro() {
    const data = new FormData(formCadastro);
    let url = '../php/usuario/save.php';
    if (idUsuario) {
        url += `?id=${idUsuario}`;
    }
    const retorno = await fetch(url, {
        method: 'POST',
        body: data
    });
    const resposta = await retorno.json();
    console.log(resposta);
    window.location.href = document.referrer;
}

async function completarFormulario(id) {
    const retorno = await fetch(`../php/usuario/get.php?id=${id}`);
    const resposta = await retorno.json();

    const usuario = resposta.data[0]
    console.log(usuario);
    for (const key in usuario) {
        if (formCadastro[key]) {
            formCadastro[key].value = usuario[key];
        }
    }
}