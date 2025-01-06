
//jogadores

var player1_name = "";
var player1_pontuation = [null,null,null,null,null,null,null,null,null,null];
var player1_total = 0;
var player1_plays = 1;
const inputPlayer1 = document.getElementById('player1');

var player2_name = "";
var player2_pontuation = [null,null,null,null,null,null,null,null,null,null];
var player2_total = 0;
var player2_plays = 1;
const inputPlayer2 = document.getElementById('player2');

var playerTurnName = document.getElementById('playerturn');
var turn = 0;
var games = 1;

//botões
const newPlayer = document.getElementById('newplayer');
const startGame = document.getElementById('start');
const newGame = document.getElementById('newgame');
const addPoints = document.getElementById('add');
const scorePoints = document.getElementById('score');
const buttonName1 = document.getElementById('name1');
const buttonName2 = document.getElementById('name2');


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

newPlayer.addEventListener('click',()=> {
    alert ("Em breve!");
});

buttonName1.addEventListener('click',()=> {
    if (inputPlayer1.value===''){
        alert("Nome do jogador não pode ser vazio!");
    }else{
        player1_name = inputPlayer1.value;
        buttonName1.disabled = 1;
        inputPlayer1.disabled = 1;
    }
});

buttonName2.addEventListener('click',()=> {
    if (inputPlayer1.value===''){
        alert("Nome do jogador não pode ser vazio!");
    }else{
        player2_name = inputPlayer2.value;
        buttonName2.disabled = 1;
        inputPlayer2.disabled = 1;
    }
});

startGame.addEventListener('click',()=> {
    if (player1_name===''||player2_name===''){
        alert("Nome do jogador não pode ser vazio!");
    }else{
        newGame.disabled = 0;
        newPlayer.disabled = 1;
        startGame.disabled = 1;
        playerTurnName.textContent = "É a vez de " + player1_name + ", jogada "+ player1_plays+"/10";
        ShowBoard (player1_pontuation);
        scorePoints.disabled = 1;
        BlockBoard (0);
    }
});

newGame.addEventListener('click',()=> {
    newGame.disabled = 1;
    newPlayer.disabled = 0;
    startGame.disabled = 0;
    inputPlayer1.disabled = 0;
    buttonName1.disabled = 0;
    inputPlayer2.disabled = 0;
    buttonName2.disabled = 0;
    inputPlayer1.value = "";
    player1_name = "";
    inputPlayer2.value = "";
    player2_name = "";
    player1_pontuation = [null,null,null,null,null,null,null,null,null,null];
    player2_pontuation = [null,null,null,null,null,null,null,null,null,null];
    player1_total = 0;
    player2_total = 0;
    playerTurnName.textContent = "Aguardando jogadores...";
    addPoints.disabled = 0;
    turn = 0;
    player1_plays = 1;
    player2_plays = 1;
    ShowBoard (player1_pontuation);
    BlockBoard (player1_pontuation);
    scorePoints.disabled = 1;
    BlockBoard (1);

});

addPoints.addEventListener('click',()=> {
    if (player1_plays === 11 && player2_plays === 10){
        AddPoints (player2_pontuation);
        BlockBoard (player2_pontuation);
        playerTurnName.textContent = "Acabaram as jogadas, aguardando o resultado";
        addPoints.disabled = 1;
        scorePoints.disabled = 0;
        turn = 2;
        BlockBoard (1);
    }
    if (turn === 0) {
        AddPoints (player1_pontuation);
        ShowBoard (player2_pontuation);
        playerTurnName.textContent = "É a vez de " + player2_name + ", jogada "+ player2_plays+"/10";
        turn = 1;
        player1_plays ++;

    } else if (turn === 1) {
        AddPoints (player2_pontuation);
        ShowBoard (player1_pontuation);
        playerTurnName.textContent = "É a vez de " + player1_name + ", jogada "+ player1_plays+"/10";
        turn = 0;
        player2_plays ++;
    }
});

scorePoints.addEventListener('click',()=> {
    
    scorePoints.disabled = 1;

    for (let i = 0; i < 10; i++){
        player1_total += Number(player1_pontuation[i]);
        player2_total += Number(player2_pontuation[i]);
    }

    if (player1_total>player2_total){

        document.getElementById("result").innerHTML +=
            "<div id=results>"+"<strong>"+
                "Jogo Nº # "+ games + "</strong>" + "<br>" 
                +player1_name+" VENCEU!"+ "<br>"
                +player1_name +": "+"<strong>"+ player1_pontuation +" = "+player1_total+"</strong>"+ "<br>"
                +player2_name +": "+"<strong>"+ player2_pontuation +" = "+player2_total+"</strong>"+ "<br>"
            +"</div><br>";
        games ++;
    } else if (player1_total<player2_total){
        document.getElementById("result").innerHTML +=
        "<div id=results>"+"<strong>"+
            "Jogo Nº # "+ games + "</strong>" + "<br>" 
            +player2_name+" VENCEU!"+ "<br>"
            +player1_name +": "+"<strong>"+ player1_pontuation +" = "+player1_total+"</strong>"+ "<br>"
            +player2_name +": "+"<strong>"+ player2_pontuation +" = "+player2_total+"</strong>"+ "<br>"
        +"</div><br>";
    games ++;
    } else {
        document.getElementById("result").innerHTML +=
        "<div id=results>"+"<strong>"+
            "Jogo Nº # "+ games + "</strong>" + "<br>" 
            +"EMPATE!"+ "<br>"
            +player1_name +": "+"<strong>"+ player1_pontuation +" = "+player1_total+"</strong>"+ "<br>"
            +player2_name +": "+"<strong>"+ player2_pontuation +" = "+player2_total+"</strong>"+ "<br>"
        +"</div><br>";
    games ++;
    }



});
