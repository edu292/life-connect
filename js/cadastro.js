const formCadastro = document.getElementById('cadastro');

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    cadastro();
})

async function cadastro() {
    const data = new FormData(formCadastro);
    const retorno = await fetch('../php/cadastro.php', {
        method: 'POST',
        body: data,
    });
    const resposta = await retorno.json();
    console.log(resposta);
    window.location.href = '../login/index.html';
}