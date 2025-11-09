const formLogin = document.getElementById('login');

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    logar();
});

async function logar() {
    // seria como se fizesse append para cada input do formulário (pelo name)
    const data = new FormData(formLogin);
    const retorno = await fetch('../php/login.php', {
        method: 'POST',
        body: data
    });

    const resposta = await retorno.json();
    if (resposta.status === 'ok') {
        const usuario = resposta.data;
        for (const key in usuario) {
            localStorage.setItem(key, usuario[key]);
        }
        if (usuario.tipo === 'doador') {
            window.location.href = '../home/doador.html';
        } else if (usuario.tipo === 'receptor') {
            window.location.href = '../home/receptor.html';
        } else if (usuario.tipo === 'motorista') {
            window.location.href = '../home/motorista.html';
        } else if (usuario.tipo === 'admin') {
            window.location.href = '../home/admin.html';
        }
    } else {
        alert('Falha nas credenciais');
    }
}