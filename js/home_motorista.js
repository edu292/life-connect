async function aceitar(idDoacao) {
    const resposta = await fetch(`../php/doacao/mudar_status.php?id=${idDoacao}&status=em-transito&id-motorista=${idMotorista}`);
    carregasDoacoesEmTransito();
    carregarDoacoesAceitas();
    carregasDoacoesConcluidas();
}

async function concluir(idDoacao) {
    const resposta = await fetch(`../php/doacao/mudar_status.php?id=${idDoacao}&status=concluida`);
    carregasDoacoesEmTransito();
    carregarDoacoesAceitas();
    carregasDoacoesConcluidas();
}

async function cancelar(idDoacao, idReceptor) {
    const resposta = await fetch(`../php/doacao/mudar_status.php?id=${idDoacao}&status=aceita&id-receptor=${idReceptor}`);
    carregasDoacoesEmTransito();
    carregarDoacoesAceitas();
    carregasDoacoesConcluidas();
}

async function criarCards(doacoes, tipo) {
    let cards = '';

    for (const doacao of doacoes) {
        let pesoTotal = 0;
        let quantidadeItens = 0;

        let tipoClasses = '';
        let btnClass = '';

        if (tipo === 'aceita') {
            tipoClasses = 'border-success border-2 bg-success-subtle';
            btnClass = 'btn-success';
        } else if (tipo === 'transito') {
            tipoClasses = 'border-primary border-2 bg-primary-subtle';
            btnClass = 'btn-primary';
        } else if (tipo === 'concluida') {
            tipoClasses = 'border-secondary bg-secondary-subtle text-muted';
        } else {
            tipoClasses = 'border-secondary';
            btnClass = 'btn-secondary';
        }

        cards += `
            <div class="col-12 mb-3">
                <div class="border p-3 h-100 d-flex flex-column text-start rounded-3 shadow-sm ${tipoClasses}">
                    <h3 class="fs-5 fw-semibold mb-3">${doacao.titulo}</h3>
                    <ul class="ps-4 mb-3">`

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
        const respostaReceptor = await fetch(`../php/usuario/get.php?id=${doacao.id_receptor}`)
        const retornoReceptor = await respostaReceptor.json();
        const receptor = retornoReceptor.data[0];

        cards += `
                    </ul>
                    <p class="small mb-1">
                        <strong class="text-muted">Endereço Origem:</strong> ${doador.endereco}
                    </p>
                    <p class="small mb-3">
                        <strong class="text-muted">Endereço Destino:</strong> ${receptor.endereco}
                    </p>
            
                    <div class="row my-2">
                        <div class="col-6">
                            <p class="small mb-0">Peso total: <span class="fw-bold">${pesoTotal.toFixed(2)}kg</span></p>
                        </div>
                        <div class="col-6">
                            <p class="small mb-0">Qtd Itens: <span class="fw-bold">${quantidadeItens}</span></p>
                        </div>
                    </div>
               `

        if (tipo === 'aceita') {
            cards += `<button class="btn ${btnClass} w-100 mt-auto" onclick="aceitar(${doacao.id})">Aceitar</button>`
        } else if (tipo === 'transito') {
            cards += `
                <div class="d-flex w-100 mt-auto gap-2">
                    <button class="btn btn-danger w-100" onclick="cancelar(${doacao.id}, ${doacao.id_receptor})">Cancelar</button>
                    <button class="btn ${btnClass} w-100" onclick="concluir(${doacao.id})">Concluir</button>
                </div>
            `
        }

        cards += '</div></div>'
    }
    return cards;
}
async function carregarDoacoesAceitas() {
    const resposta = await fetch('../php/doacao/get.php?status=aceita');
    const retorno = await resposta.json();
    doacoesAceitasWrapper.innerHTML = await criarCards(retorno.data, 'aceita');
}

async function carregasDoacoesEmTransito() {
    const resposta = await fetch(`../php/doacao/get.php?id-motorista=${idMotorista}&status=em-transito`);
    const retorno = await resposta.json();
    doacoesEmTransitoWrapper.innerHTML = await criarCards(retorno.data, 'transito')
}

async function carregasDoacoesConcluidas() {
    const resposta = await fetch(`../php/doacao/get.php?id-motorista=${idMotorista}&status=concluida`);
    const retorno = await resposta.json();
    doacoesConcluidasWrapper.innerHTML = await criarCards(retorno.data, 'concluida');
}

const idMotorista = localStorage.getItem('id');
const doacoesAceitasWrapper = document.getElementById('doacoes-aceitas-wrapper');
const doacoesEmTransitoWrapper = document.getElementById('doacoes-em-transito-wrapper');
const doacoesConcluidasWrapper = document.getElementById('doacoes-concluidas-wrapper');
carregarDoacoesAceitas();
carregasDoacoesEmTransito();
carregasDoacoesConcluidas();