(async function() {
    const paginasPermitidas = {
        admin: ['home/admin.html', 'categoria/index.html', 'categoria/formulario.html', 'usuario/index.html', 'usuario/formulario.html'],
        doador: ['home/doador.html', 'doacao/formulario.html'],
        receptor: ['home/receptor.html'],
        motorista: ['home/motorista.html'],
    }

    const resposta = await fetch('../php/valida_sessao.php');

    const retorno = await resposta.json();

    if (retorno.status !== 'ok') {
        document.location.href = '../login/index.html';
    }

    const path = window.location.pathname.split('/').slice(2).join('/');

    if (!paginasPermitidas[retorno.data.tipo].includes(path)) {
        document.location.href = '../login/index.html';
    }
})();