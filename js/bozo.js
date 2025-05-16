
// Array que armazenará os jogadores
const jogadores = [];

// Referências aos elementos HTML
const inputNome = document.getElementById('nomeJogador');
const colorPicker = document.getElementById('colorPicker');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaJogadores = document.getElementById('listaJogadores');
const totalJogadores = document.getElementById('totalJogadores');

// Evento de clique do botão "OK"
btnAdicionar.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    const cor = colorPicker.value; // cor selecionada

    if (nome !== '') {
        // Cria um objeto jogador com os campos definidos
        const jogador = {
            nome: nome,
            corSelecionada: cor,
            pontuacao: Array(10).fill(null),
            total: 0,
            jogadas: 0
        };

        // Adiciona o jogador à lista
        jogadores.push(jogador);

        // Atualiza a interface para mostrar o jogador cadastrado com a posição
        adicionarJogadorNaLista(jogador);

        // Atualiza a quantidade total de jogadores exibida
        totalJogadores.textContent = `Total de Jogadores: ${jogadores.length}`;

        // Limpa o input e reseta o color picker para branco
        inputNome.value = '';
        colorPicker.value = "#007bff";
        inputNome.focus();
    }
});

// Função para atualizar a lista de jogadores na tela com a posição
function adicionarJogadorNaLista(jogador) {
    // A posição é o índice do jogador no array + 1
    const posicao = jogadores.length;
    const li = document.createElement('li');

    // Formata o texto com a posição e o nome do jogador
    li.textContent = `${posicao}º - ${jogador.nome}`;

    // Define a cor do texto com a cor escolhida
    li.style.color = jogador.corSelecionada;

    listaJogadores.appendChild(li);
}



//botões
const startGame = document.getElementById('start');
const newGame = document.getElementById('newgame');
const addPoints = document.getElementById('add');
const scorePoints = document.getElementById('score');


var playerTurnName = document.getElementById('playerturn');
var turn = 0;
var games = 1;
var vez = 0;
var pvez = 0;



//tabuleiro

let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let four = document.getElementById('four');
let five = document.getElementById('five');
let six = document.getElementById('six');
let full = document.getElementById('full');
let straight = document.getElementById('straight');
let square = document.getElementById('square');
let gereral = document.getElementById('gereral');


function ShowBoard(pontuation) {

    one.value = pontuation[0];
    two.value = pontuation[1];
    three.value = pontuation[2];
    four.value = pontuation[3];
    five.value = pontuation[4];
    six.value = pontuation[5];
    full.value = pontuation[6];
    straight.value = pontuation[7];
    square.value = pontuation[8];
    general.value = pontuation[9];

}

function BlockBoard(status) {

    one.disabled = Number(status);
    two.disabled = Number(status);
    three.disabled = Number(status);
    four.disabled = Number(status);
    five.disabled = Number(status);
    six.disabled = Number(status);
    full.disabled = Number(status);
    straight.disabled = Number(status);
    square.disabled = Number(status);
    general.disabled = Number(status);

}

function AddPoints(pontuation) {

    pontuation[0] = one.value;
    pontuation[1] = two.value;
    pontuation[2] = three.value;
    pontuation[3] = four.value;
    pontuation[4] = five.value;
    pontuation[5] = six.value;
    pontuation[6] = full.value;
    pontuation[7] = straight.value;
    pontuation[8] = square.value;
    pontuation[9] = general.value;
}


startGame.addEventListener('click', () => {

    newGame.disabled = 0;
    startGame.disabled = 1;
    scorePoints.disabled = 1;
    addPoints.disabled = 0;
    btnAdicionar.disabled = 1;
    ShowBoard(jogadores[0].pontuacao);
    BlockBoard(0);
    playerTurnName.textContent = "É a vez de " + jogadores[0].nome + ", jogada " + (jogadores[0].jogadas + 1) + "/10";
    document.documentElement.style.setProperty('--board-color', String(jogadores[0].corSelecionada) + 70);
    document.documentElement.style.setProperty('--board-border', "#000000");


});

// Reinicia o jogo
newGame.addEventListener('click', () => {
    location.reload();
});

addPoints.addEventListener('click', () => {

    if (turn < (jogadores.length * 10) - 1) {

        vez = (turn % jogadores.length)
        pvez = ((turn + 1) % jogadores.length)

        AddPoints(jogadores[vez].pontuacao);
        jogadores[vez].jogadas++;
        turn++;
        ShowBoard(jogadores[pvez].pontuacao);
        playerTurnName.textContent = "É a vez de " + jogadores[pvez].nome + ", jogada " + (jogadores[pvez].jogadas + 1) + "/10";
        document.documentElement.style.setProperty('--board-color', String(jogadores[pvez].corSelecionada) + 70);
        document.documentElement.style.setProperty('--board-border', "#000000");



    } else {

        AddPoints(jogadores[pvez].pontuacao);
        jogadores[pvez].jogadas++;
        playerTurnName.textContent = "Aguardando o resultado";
        console.log(jogadores);
        addPoints.disabled = 1;
        scorePoints.disabled = 0;
        BlockBoard(1);
        document.documentElement.style.setProperty('--board-color', "#000000");
        document.documentElement.style.setProperty('--board-border', "#9b9b9b");

    }

});

scorePoints.addEventListener('click', () => {
    scorePoints.disabled = true;

    // Calcula total de cada jogador
    jogadores.forEach(jogador => {
        jogador.total = jogador.pontuacao.reduce((acc, curr) => acc + Number(curr), 0);
    });

    const maxScore = Math.max(...jogadores.map(j => j.total));
    const vencedores = jogadores.filter(j => j.total === maxScore);

    let resultadoHTML = `<br><div class="result-win" style="background-color: ${jogadores[0].corSelecionada}70;">`;
    resultadoHTML += `<strong>Jogo Nº #${games}</strong><br>`;

    if (vencedores.length > 1) {
        // Empate
        const nomesEmpatados = vencedores.map(j => j.nome).join(', ');
        resultadoHTML += `Empate entre: <strong>${nomesEmpatados}</strong> com ${maxScore} pontos!<br>`;
    } else {
        // Vencedor único
        resultadoHTML += `${vencedores[0].nome} <strong>VENCEU!</strong><br>`;
    }

    // Exibe placar detalhado de todos os jogadores
    jogadores.forEach(jogador => {
        resultadoHTML += `<div>
      ${jogador.nome}: [${jogador.pontuacao.join(', ')}] = <strong>${jogador.total}</strong>
    </div>`;
    });

    resultadoHTML += `</div>`;

    // Gerar data e hora
    const dataHora = new Date();
    const formatado = dataHora.toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    // Cor de fundo
    const empate = vencedores.length > 1;
    const corFundo = empate ? '#cccccc' : `${jogadores[0].corSelecionada}70`;

    let html = `<br><div class="result-win" style="background-color: ${corFundo}; padding: 10px; border-radius: 8px;">`;
    html += `<strong>${formatado}</strong><br>`;

    if (empate) {
        const nomes = vencedores.map(v => v.nome).join(', ');
        const pontos = vencedores[0].total;
        html += `Empate entre: <strong>${nomes}</strong> com ${pontos} pontos!<br>`;
    } else {
        html += `${vencedores[0].nome} <strong>VENCEU!</strong><br>`;
    }

    jogadores.forEach(jogador => {
        html += `${jogador.nome}: [${jogador.pontuacao.join(', ')}] = <strong>${jogador.total}</strong><br>`;
    });

    html += `</div>`;
    document.getElementById("result").innerHTML += html;
    scrollToBottom();


    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });

    }

    const historico = JSON.parse(localStorage.getItem("historicoJogos")) || [];

    historico.push({
        dataHora: formatado,
        vencedores: vencedores.map(j => ({ nome: j.nome, total: j.total })),
        jogadores: jogadores.map(j => ({
            nome: j.nome,
            pontuacao: [...j.pontuacao],
            total: j.total,
            cor: j.corSelecionada
        }))
    });

    localStorage.setItem("historicoJogos", JSON.stringify(historico));

})
