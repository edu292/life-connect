Todas as alterações foram resoluções de conflitos lógicos no CRUD de doacao. 
O _name_ do formulário que recebe o nome estava errado. A lógica por trás da criação de ID estava falha, dessa forma de agora, as variáveis que vem por POST e GET são verificadas e o ID é criado efetivamente. Foram feitas algumas erros de sintaxe e atribuilçoes de variaveis, coisa besta já está corrigido tb bbs

O que faltou: 
Como o crud de lote_doações ainda não foi feito, a função carregarDados() não está perfomando nada no sistema, por isso comentei ela por enquanto. Fazer questão que nos arquivos php, o header esteja sempre chamado antes da declaração de variáveis
dessa forma evitamos aquele consolelog chato de erro de JSON.parse. Implementar um mecanismo de logs de erros do MySQL nos stmt executados, dessa forma, se o erro estiver na arquitetura do nosso BD, a identificação é mais simples.

Resumo: Só corrigi o que não estava funcionado 
#NaoSouDevAinda #SoSeiCorrigir

Parabéns vc sabe ler 🤪