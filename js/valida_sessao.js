(async function() {
    const paginasPermitidas = {
        admin: ['/life-connect/home/admin.html', '/life-connect/categorias/index.html', '/life-connect/categorias/formulario.html', '/life-connect/usuarios/index.html', 'life-connect/usuarios/formulario.html'],
        doador: ['/life-connect/home/doador.html', '/life-connect/doacao/formulario.html'],
        receptor: ['/life-connect/home/receptor.html'],
        motorista: ['/life-connect/home/motorista.html'],
    }

    const resposta = await fetch('../php/valida_sessao.php');

    const retorno = await resposta.json();
    console.log(retorno.status)

    if (retorno.status !== 'ok') {
        document.location.href = '../login/index.html';
    }

    console.log(window.location.pathname);
    console.log(retorno.data);
    console.log(paginasPermitidas[retorno.data.tipo])
    if (!paginasPermitidas[retorno.data.tipo].includes(window.location.pathname)) {
        document.location.href = '../login/index.html';
    }
})();