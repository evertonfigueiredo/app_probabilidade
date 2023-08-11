function calcularProbabilidade(jogos_anteriores) {
    let vitorias_time_Vermelho = jogos_anteriores.filter(time => time === 'Venda').length;
    let vitorias_time_Preto = jogos_anteriores.filter(time => time === 'Compra').length;
    let empates = jogos_anteriores.filter(time => time === 'Doji').length;

    let total_jogos = jogos_anteriores.length + 2; // Somamos 2 para incluir os pesos dos empates e times Vermelho e Preto.

    let probabilidade_time_Vermelho = (vitorias_time_Vermelho + 0.495) / total_jogos;
    let probabilidade_time_Preto = (vitorias_time_Preto + 0.495) / total_jogos;
    let probabilidade_Zero = (empates + 0.01) / total_jogos;

    return [probabilidade_time_Vermelho * 100, probabilidade_time_Preto * 100, probabilidade_Zero * 100];
}

function preverResultado(probabilidade_time_Vermelho, probabilidade_time_Preto, probabilidade_Zero) {
    if (probabilidade_time_Vermelho > probabilidade_time_Preto && probabilidade_time_Vermelho > probabilidade_Zero) {
        return ["Venda", probabilidade_time_Vermelho]
    }
    if (probabilidade_time_Preto > probabilidade_time_Vermelho && probabilidade_time_Preto > probabilidade_Zero) {
        return ["Compra", probabilidade_time_Preto]
    }
    if (probabilidade_Zero > probabilidade_time_Preto && probabilidade_Zero > probabilidade_time_Vermelho) {
        return ["Doji", probabilidade_Zero]
    }
    return ["Indefinido", 0.00]
}

function calcularPrevisao() {
    // let numeroSelects = document.querySelector("#numero_select").value
    let numeroSelects = 7
    let form = document.getElementById('formJogos');
    let jogos_anteriores = [];

    for (let i = 1; i <= numeroSelects; i++) {
        let select = form.elements[`jogo${i}`];
        jogos_anteriores.push(select.value);
    }

    let [prob_time_Vermelho, prob_time_Preto, prob_Zero] = calcularProbabilidade(jogos_anteriores);
    let [resultado_jogo, probabilidade] = preverResultado(prob_time_Vermelho, prob_time_Preto, prob_Zero);

    let resultadoDiv = document.getElementById('resultado');
    if (resultado_jogo === "Indefinido") {
        resultadoDiv.innerHTML = `<p>Previsão: '${resultado_jogo}'</p>`
        let btnCalcular = document.getElementById('btnCalcular');
        btnCalcular.disabled = true
    } else {
        resultadoDiv.innerHTML = `<p>Previsão: '${resultado_jogo}' com ${probabilidade.toFixed(2)}%</p>`
    // }
    // resultadoDiv.innerHTML += `<p>Vermelho ganhar: ${prob_time_Vermelho.toFixed(2)}%</p>
    //                           <p>Preto ganhar: ${prob_time_Preto.toFixed(2)}%</p>
    //                           <p>Zero ganhar: ${prob_Zero.toFixed(2)}%</p>`;
    // 
    resultadoDiv.innerHTML += `<p>Venda: ${prob_time_Vermelho.toFixed(2)}%</p>
                              <p>Comprar: ${prob_time_Preto.toFixed(2)}%</p>
                              <p>Doji: ${prob_Zero.toFixed(2)}%</p>`;
    }
    let porcentagem = document.querySelector("#porcentagem_sinal").value

    if (probabilidade > porcentagem) {
        // Adicionar quadrado com a cor correspondente e porcentagem ao lado do resultado
        let cor = "";
        switch (resultado_jogo) {
            case 'Venda':
                cor = "red";
                break;
            case 'Compra':
                cor = "black";
                break;
            case 'Doji':
                cor = "white";
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
    
    for (let i = numeroSelects; i > 1; i--) {
        form.elements[`jogo${i}`].value = form.elements[`jogo${i - 1}`].value;
    }
    console.log(numeroSelects);
    form.elements[`jogo1`].value = resultado_jogo;
}

function reiniciarSelects(numeroSelects) {
    let form = document.getElementById('formJogos');
    for (let i = 1; i <= numeroSelects; i++) {
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
    let numeroSelects = 7
    // let numeroSelects = document.querySelector("#numero_select").value
    for (let i = 1; i <= numeroSelects; i++) {
        let select = form.elements[`jogo${i}`];
        if (select.value === "") {
            selecionado = false;
            break;
        }
    }

    btnCalcular.disabled = !selecionado;
}

function criarSelects(numeroSelects) {
    var form = document.getElementById("formJogos");

    for (var i = 1; i <= numeroSelects; i++) {
      var select = document.createElement("select");
      select.name = "jogo" + i;
      select.setAttribute("onchange", "verificarSelecoes()");

      var optionEscolha = document.createElement("option");
      optionEscolha.value = "";
      optionEscolha.textContent = "Escolha uma opção";
      optionEscolha.disabled = true;
      optionEscolha.selected = true;

      var optionVermelho = document.createElement("option");
      optionVermelho.value = "Venda";
      optionVermelho.textContent = "Venda";

      var optionPreto = document.createElement("option");
      optionPreto.value = "Compra";
      optionPreto.textContent = "Compra";

      var optionZero = document.createElement("option");
      optionZero.value = "Doji";
      optionZero.textContent = "Doji";

      select.appendChild(optionEscolha);
      select.appendChild(optionVermelho);
      select.appendChild(optionPreto);
      select.appendChild(optionZero);
    
      let first = form.firstChild;
      form.insertBefore(select, first);
    }
  }

document.querySelector("#calculos").style.display = 'flex'
document.querySelector("#gerador").style.display = 'none'
criarSelects(7);
verificarSelecoes();

function gerar() {
    document.querySelector("#gerador").style.display = 'none'
    document.querySelector("#calculos").style.display = 'flex'
    let numeroSelects = document.querySelector("#numero_select").value
    criarSelects(numeroSelects);
    verificarSelecoes();
}


