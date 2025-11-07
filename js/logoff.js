// Função que executa o logoff
async function executarLogoff() {
        // Faz a requisição ao script PHP
        const resposta = await fetch("../php/logoff.php");
        
        // Converte a resposta para JSON
        const retorno = await resposta.json();

        // Verifica o status retornado pelo PHP
        if (retorno.status === 'ok') {
            // Logoff bem-sucedido: Redireciona o usuário
            alert("Sessão encerrada com sucesso.");
            window.location.href = "../login/index.html";
        } else {
            // Caso o PHP retorne 'nok' ou outro status
            alert("Erro ao encerrar a sessão: " + retorno.mensagem);
        }

}

// 3. Anexa a função ao botão (após o DOM carregar)
    const botaoLogoff = document.getElementById('botao_logoff').addEventListener('click', (event) => {
        event.preventDefault(); 
        executarLogoff();
    });
