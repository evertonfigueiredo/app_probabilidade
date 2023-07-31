function calcularProbabilidade(jogos_anteriores) {
    let vitorias_time_Vermelho = jogos_anteriores.filter(time => time === 'Vermelho').length;
    let vitorias_time_Preto = jogos_anteriores.filter(time => time === 'Preto').length;
    let empates = jogos_anteriores.filter(time => time === 'Zero').length;

    let total_jogos = jogos_anteriores.length + 2; // Somamos 2 para incluir os pesos dos empates e times Vermelho e Preto.

    let probabilidade_time_Vermelho = (vitorias_time_Vermelho + 0.495) / total_jogos;
    let probabilidade_time_Preto = (vitorias_time_Preto + 0.495) / total_jogos;
    let probabilidade_Zero = (empates + 0.01) / total_jogos;

    return [probabilidade_time_Vermelho * 100, probabilidade_time_Preto * 100, probabilidade_Zero * 100];
}

function preverResultado(probabilidade_time_Vermelho, probabilidade_time_Preto, probabilidade_Zero) {
    if (probabilidade_time_Vermelho > probabilidade_time_Preto && probabilidade_time_Vermelho > probabilidade_Zero) {
        return ["Vermelho", probabilidade_time_Vermelho]
    }
    if (probabilidade_time_Preto > probabilidade_time_Vermelho && probabilidade_time_Preto > probabilidade_Zero) {
        return ["Preto", probabilidade_time_Preto]
    }
    if (probabilidade_Zero > probabilidade_time_Preto && probabilidade_Zero > probabilidade_time_Vermelho) {
        return ["Zero", probabilidade_Zero]
    }
    return ["Indefinido", 0.00]
}

function calcularPrevisao() {
    let form = document.getElementById('formJogos');
    let jogos_anteriores = [];

    for (let i = 1; i <= 10; i++) {
        let select = form.elements[`jogo${i}`];
        jogos_anteriores.push(select.value);
    }

    let [prob_time_Vermelho, prob_time_Preto, prob_Zero] = calcularProbabilidade(jogos_anteriores);
    let [resultado_11_jogo, probabilidade] = preverResultado(prob_time_Vermelho, prob_time_Preto, prob_Zero);

    let resultadoDiv = document.getElementById('resultado');
    if (resultado_11_jogo === "Indefinido") {
        resultadoDiv.innerHTML = `<p>Previsão para o 11º: '${resultado_11_jogo}'</p>`
        let btnCalcular = document.getElementById('btnCalcular');
        btnCalcular.disabled = true
    } else {
        resultadoDiv.innerHTML = `<p>Previsão para o 11º: '${resultado_11_jogo}' com ${probabilidade.toFixed(2)}%</p>`
    }
    resultadoDiv.innerHTML += `<p>Vermelho ganhar: ${prob_time_Vermelho.toFixed(2)}%</p>
                              <p>Preto ganhar: ${prob_time_Preto.toFixed(2)}%</p>
                              <p>Zero ganhar: ${prob_Zero.toFixed(2)}%</p>`;
    

    if (probabilidade > 60) {
        // Adicionar quadrado com a cor correspondente e porcentagem ao lado do resultado
        let cor = "";
        switch (resultado_11_jogo) {
            case 'Vermelho':
                cor = "red";
                break;
            case 'Preto':
                cor = "black";
                break;
            case 'Zero':
                cor = "green";
                break;
            default:
                cor = "transparent";
                break;
        }

        let resultadoInfoDiv = document.createElement('div');
        resultadoInfoDiv.classList.add('resultado-info');

        let resultadoCorDiv = document.createElement('div');
        resultadoCorDiv.classList.add('resultado-cor');
        resultadoCorDiv.style.backgroundColor = cor;

        let resultadoPorcentagemDiv = document.createElement('div');
        resultadoPorcentagemDiv.textContent = `${probabilidade.toFixed(2)}%`;

        resultadoInfoDiv.appendChild(resultadoCorDiv);
        resultadoInfoDiv.appendChild(resultadoPorcentagemDiv);
        let first = resultadoDiv.firstChild
        resultadoDiv.insertBefore(resultadoInfoDiv, first);
    }
    
    for (let i = 1; i < 10; i++) {
        form.elements[`jogo${i}`].value = form.elements[`jogo${i + 1}`].value;
    }
    form.elements[`jogo10`].value = resultado_11_jogo;
}

function reiniciarSelects() {
    let form = document.getElementById('formJogos');
    for (let i = 1; i <= 10; i++) {
        let select = form.elements[`jogo${i}`];
        select.selectedIndex = 0; // Define o índice do select para a opção inicial vazia
    }

    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ""; // Limpa o conteúdo da div resultado

    let btnCalcular = document.getElementById('btnCalcular');
    btnCalcular.disabled = true; // Desabilita o botão de calcular novamente até que todas as seleções sejam feitas
}

function verificarSelecoes() {
    let form = document.getElementById('formJogos');
    let btnCalcular = document.getElementById('btnCalcular');
    let selecionado = true;

    for (let i = 1; i <= 10; i++) {
        let select = form.elements[`jogo${i}`];
        if (select.value === "") {
            selecionado = false;
            break;
        }
    }

    btnCalcular.disabled = !selecionado;
}

verificarSelecoes();