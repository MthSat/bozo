
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
    colorPicker.value = "#ffffff";
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


function ShowBoard (pontuation){

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

function BlockBoard (status){

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

function AddPoints (pontuation){

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


startGame.addEventListener('click',()=> {
    
    newGame.disabled = 0;
    startGame.disabled = 1;
    scorePoints.disabled = 1;
    addPoints.disabled = 0;
    ShowBoard (jogadores[0].pontuacao);
    BlockBoard (0);
    playerTurnName.textContent = "É a vez de " + jogadores[0].nome + ", jogada "+ (jogadores[0].jogadas+1)+"/10";
    document.documentElement.style.setProperty('--board-color', String(jogadores[0].corSelecionada)+70);
    document.documentElement.style.setProperty('--board-border', "#000000");

    
});

newGame.addEventListener('click',()=> {
    newGame.disabled = 1;
    startGame.disabled = 0;
    playerTurnName.textContent = "Aguardando jogadores...";
    addPoints.disabled = 0;
    turn = 0;
    //ShowBoard (player1_pontuation);
    //BlockBoard (player1_pontuation);
    scorePoints.disabled = 1;
    BlockBoard (1);
    addPoints.disabled = 1;
    document.documentElement.style.setProperty('--board-color', "#000000");
    document.documentElement.style.setProperty('--board-border', "#9b9b9b");

});

addPoints.addEventListener('click',()=> {

    if (turn<(jogadores.length*10)-1){
       
        vez = (turn % jogadores.length)
        pvez = ((turn+1) % jogadores.length)
                
        AddPoints (jogadores[vez].pontuacao);
        jogadores[vez].jogadas++;
        turn++;
        ShowBoard (jogadores[pvez].pontuacao);
        playerTurnName.textContent = "É a vez de " + jogadores[pvez].nome + ", jogada "+ (jogadores[pvez].jogadas+1)+"/10";
        document.documentElement.style.setProperty('--board-color', String(jogadores[pvez].corSelecionada)+70);
        document.documentElement.style.setProperty('--board-border', "#000000");
              


    }else{
        
        AddPoints (jogadores[pvez].pontuacao);
        jogadores[pvez].jogadas++;
        playerTurnName.textContent = "Aguardando o resultado";
        console.log(jogadores);
        addPoints.disabled = 1;
        scorePoints.disabled = 0;
        BlockBoard (1);
        document.documentElement.style.setProperty('--board-color', "#000000");
        document.documentElement.style.setProperty('--board-border', "#9b9b9b");

    }

});

scorePoints.addEventListener('click',()=> {
    
    scorePoints.disabled = 1;

    for (let i = 0; i < jogadores.length; i++){
        jogadores[i].total = jogadores[i].pontuacao.reduce((acc, curr) => acc + Number(curr), 0);
        console.log(jogadores[i].total);
    }

    const maxScore = Math.max(...jogadores.map(j => j.total));
    const vencedores = jogadores.filter(j => j.total === maxScore);
    if (vencedores.length > 1) {
        // Caso de empate: cria uma lista com os nomes dos jogadores empatados
        const nomesEmpatados = vencedores.map(j => j.nome).join(', ');
        console.log(`Empate entre: ${nomesEmpatados} com ${maxScore} pontos!`);        

    } else {
        // Caso haja apenas um vencedor
        const vencedor = vencedores[0];
        console.log(`O vencedor é ${vencedor.nome} com ${vencedor.total} pontos!`); 

        document.getElementById("result").innerHTML +=

        `<br>
        <div id=result-win style="background-color: ${String(jogadores[0].corSelecionada)+70}">
        <strong>Jogo Nº #${games}</strong><br>
        ${vencedor.nome} VENCEU!<br>
        </div>`
        games ++;
        scrollToBottom();
    }


    // if (player1_total>player2_total){

    //     document.getElementById("result").innerHTML +=

    //     `<br>
    //     <div id=result-win style="background-color: ${String(colorPlayer1)+70}">
    //     <strong>Jogo Nº #${games}</strong><br>
    //         ${player1_name} VENCEU!<br>
    //         ${player1_name}: <strong> ${player1_pontuation} = ${player1_total}</strong><br>
    //         ${player2_name}: <strong> ${player2_pontuation} = ${player2_total}</strong><br>
    //     </div>`

    //     games ++;
    //     scrollToBottom();
    // } else if (player1_total<player2_total){
    //     document.getElementById("result").innerHTML +=

    //     `<br>
    //     <div id=result-win style="background-color: ${String(colorPlayer2)+70}">
    //     <strong>Jogo Nº #${games}</strong><br>
    //         ${player2_name} VENCEU!<br>
    //         ${player1_name}: <strong> ${player1_pontuation} = ${player1_total}</strong><br>
    //         ${player2_name}: <strong> ${player2_pontuation} = ${player2_total}</strong><br>
    //     </div>`
        
    //     games ++;
    //     scrollToBottom();
    // } else {
    //     document.getElementById("result").innerHTML +=

    //     `<br>
    //     <div id=result-draw>
    //     <strong>Jogo Nº #${games}</strong><br>
    //         EMPATE!<br>
    //         ${player1_name}: <strong> ${player1_pontuation} = ${player1_total}</strong><br>
    //         ${player2_name}: <strong> ${player2_pontuation} = ${player2_total}</strong><br>
    //     </div>`
        
    //     games ++;
    //     scrollToBottom();
    // }

    function scrollToBottom() {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });

    }
});