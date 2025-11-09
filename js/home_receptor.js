async function aceitar(idDoacao) {
    await fetch(`../php/doacao/mudar_status.php?id=${idDoacao}&status=aceita&id-receptor=${idReceptor}`);
    carregarDoacoesDisponiveis();
    carregarMinhasDoacoes();
}

async function cancelar(idDoacao) {
    await fetch(`../php/doacao/mudar_status.php?id=${idDoacao}&status=disponivel`);
    carregarDoacoesDisponiveis();
    carregarMinhasDoacoes();
}

async function criarCards(doacoes, tipo) {
    let cards = '';
    for (const doacao of doacoes) {
        let pesoTotal = 0;
        let quantidadeItens = 0;
        cards += `
            <div class="col-12 col-md-6 mb-4">
                <div class="border p-3 h-100 ${tipo === 'aceita' ? "border-success border-2": ""}d-flex flex-column">
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
        cards += `
                    </ul>
                    <p class="small text-muted mb-2">
                        <strong>Endereço:</strong> ${doador.endereco}
                    </p>
            
                    <div class="row my-3">
                        <div class="col-6">
                            <p class="small mb-0">Peso total: <label>${pesoTotal}kg</label></p>
                        </div>
                        <div class="col-6">
                            <p class="small mb-0">Qtd Itens: <label>${quantidadeItens}</label></p>
                        </div>
                    </div>
               `
        if (tipo === 'disponivel') {
            cards += `<button class="btn btn-secondary w-100 mt-auto" onclick="aceitar(${doacao.id})">Aceitar</button>`
        } else {
            cards += `<button class="btn btn-outline-danger w-100 mt-auto" onclick="cancelar(${doacao.id})">Cancelar</button>`
        }
        cards += '</div></div>'
    }
    return cards;
}

async function carregarMinhasDoacoes() {
    const resposta = await fetch(`../php/doacao/get.php?id-receptor=${idReceptor}`);
    const retorno = await resposta.json();
    const doacoes = retorno.data
    doacoesAceitasWrapper.innerHTML = await criarCards(doacoes, 'aceita');
}

async function carregarDoacoesDisponiveis() {
    const resposta = await fetch('../php/doacao/get.php?status=disponivel');
    const retorno = await resposta.json();
    const doacoes = retorno.data;
    doacoesDisponiveisWrapper.innerHTML = await criarCards(doacoes, 'disponivel');
}

const doacoesDisponiveisWrapper = document.getElementById('doacoes-disponiveis-wrapper');
const doacoesAceitasWrapper = document.getElementById('doacoes-aceitas-wrapper');
const idReceptor = localStorage.getItem('id');
carregarDoacoesDisponiveis();
carregarMinhasDoacoes();