async function aceitar(idDoacao) {
    const idDoador = localStorage.getItem('id');
    const resposta = await fetch(`../php/doacao/mudar_status.php?id${idDoacao}&status=aceita&id-doador=${idDoador}`);
    window.location.reload();
}

async function carregarDados() {
    const resposta = await fetch('../php/doacao/get.php?status=disponivel');
    const retorno = await resposta.json();
    const doacoes = retorno.data;
    let cards = '';
    for (const doacao of doacoes) {
        let pesoTotal = 0;
        let quantidadeItens = 0;
        cards += `
            <div class="col-12 col-md-6 mb-4">
                <div class="border p-3 h-100 d-flex flex-column">
                    <h3>${doacao.titulo}</h3>
                    <ul>`
        const respostaLote = await fetch(`../php/lote/get.php?id-doacao=${doacao.id}`);
        const retornoLote = await respostaLote.json();
        const lotes = retornoLote.data;
        for (const lote of lotes) {
            quantidadeItens += lote.quantidade;
            pesoTotal += parseFloat(lote.peso_total);
            cards += `<li>${lote.quantidade} ${lote.nome_alimento}</li>`
        }
        const respostaDoador = await fetch(`../php/usuario/get.php?id=${doacao.id_doador}`);
        const retornoDoador = await respostaDoador.json();
        const doador = retornoDoador.data[0];
        const endereco = `${doador.rua}, ${doador.numero} - ${doador.bairro}`
        cards += `
                    </ul>
                    <p class="small text-muted mb-2">
                        <strong>Endereço:</strong> ${endereco}
                    </p>
            
                    <div class="row my-3">
                        <div class="col-6">
                            <p class="small mb-0">Peso total: <label>${pesoTotal}kg</label></p>
                        </div>
                        <div class="col-6">
                            <p class="small mb-0">Qtd Itens: <label>${quantidadeItens}</label></p>
                        </div>
                    </div>
            
                    <button class="btn btn-secondary w-100 mt-auto" onclick="aceitar(${doacao.id})">Aceitar</button>
                </div>
            </div>`
    }
    cardsWrapper.innerHTML = cards;
}

const cardsWrapper = document.getElementById('doacoes-disponiveis-wrapper');
carregarDados();