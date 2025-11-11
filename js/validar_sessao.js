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

    const path = window.location.pathname.split('/').slice(2).join('/'); //window.location.pathname é a url
    //split() transforma uma string em um array, cortando nos pontos onde tem /

    if (!paginasPermitidas[retorno.data.tipo].includes(path)) { //verifica se a pagina atual está no array de pags permitidas para o tipo de usuário retornado pelo servidor 
        document.location.href = '../login/index.html'; //Se a pagina nao estiver permitida para o tipo do usuário, manda para o login
    }
})();