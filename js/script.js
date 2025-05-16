function exibirHistorico() {
  const historico = JSON.parse(localStorage.getItem("historicoJogos")) || [];
  const container = document.getElementById("result");
  container.innerHTML = '';

  // Mostrar os mais recentes primeiro
  historico.reverse().forEach((jogo) => {
    const empate = jogo.vencedores.length > 1;
    const corFundo = empate ? '#cccccc' : `${jogo.jogadores[0].cor}70`;

    let html = `<br><div class="result-win" style="background-color: ${corFundo}; padding: 10px; border-radius: 8px;">`;
    html += `<strong>${jogo.dataHora}</strong><br>`;

    if (empate) {
      const nomes = jogo.vencedores.map(v => v.nome).join(', ');
      const pontos = jogo.vencedores[0].total;
      html += `Empate entre: <strong>${nomes}</strong> com ${pontos} pontos!<br>`;
    } else {
      html += `${jogo.vencedores[0].nome} <strong>VENCEU!</strong><br>`;
    }

    jogo.jogadores.forEach(jogador => {
      html += `${jogador.nome}: [${jogador.pontuacao.join(', ')}] = <strong>${jogador.total}</strong><br>`;
    });

    html += `</div>`;
    container.innerHTML += html;
  });
}

// Executa ao carregar a página
window.onload = exibirHistorico;


document.getElementById('limparHistorico').addEventListener('click', () => {
  localStorage.removeItem("historicoJogos");
  document.getElementById("result").innerHTML = '';
});