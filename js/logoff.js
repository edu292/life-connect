async function executarLogoff() {
        // Faz a requisição ao script PHP
        const resposta = await fetch("../php/logoff.php");
        
        // Converte a resposta para JSON
        const retorno = await resposta.json();

        // Verifica o status retornado pelo PHP
        if (retorno.status === 'ok') {
            // Logoff bem-sucedido: Redireciona o usuário
            window.location.href = "../login/index.html";
        }
}

// 3. Anexa a função ao botão
const botaoLogoff = document.getElementById('botao_logoff');

botaoLogoff.addEventListener('click', (event) => {
    event.preventDefault();
    executarLogoff();
});