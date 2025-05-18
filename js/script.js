
// Executa ao carregar a página
window.onload = exibirHistorico;

function exibirHistorico() {
  const historico = JSON.parse(localStorage.getItem("historicoJogos")) || [];
  const container = document.getElementById("result");
  if (!container) return;
  container.innerHTML = '';

  historico.reverse().forEach((jogo) => {
    const empate = jogo.vencedores.length > 1;
    const corFundo = empate
      ? '#cccccc'
      : `${jogo.vencedores[0].cor || '#999999'}70`;

    const resultDiv = document.createElement("div");
    resultDiv.classList.add("historico-item");
    resultDiv.style.backgroundColor = corFundo;
    resultDiv.style.padding = "10px";
    resultDiv.style.borderRadius = "8px";
    resultDiv.style.marginBottom = "10px";
    resultDiv.style.position = "relative";

    // Conteúdo estilo WhatsApp
    let textoWhats = `🕓 *${jogo.dataHora}*\n`;
    if (empate) {
      const nomes = jogo.vencedores.map(v => v.nome).join(', ');
      textoWhats += `🤝 Empate entre: *${nomes}* com *${jogo.vencedores[0].total}* pontos!\n`;
    } else {
      textoWhats += `🏆 *${jogo.vencedores[0].nome} VENCEU!*\n`;
    }

    jogo.jogadores.forEach(jogador => {
      const pontos = jogador.pontuacao ? jogador.pontuacao.join(', ') : '';
      textoWhats += `🎲 ${jogador.nome}: [${pontos}] = *${jogador.total}*\n`;
    });

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("resultado-conteudo");
    contentDiv.innerHTML = textoWhats
      .replace(/\n/g, '<br>')
      .replace(/\*/g, '<strong>')
      .replace(/<\/strong><br>/g, '</strong><br>');
    resultDiv.appendChild(contentDiv);

    // Botão de compartilhar (copiar)
    const shareBtn = document.createElement("button");
    shareBtn.textContent = "📋 Compartilhar";
    shareBtn.classList.add("compartilhar-btn");
    shareBtn.style.marginRight = "6px";

    shareBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(textoWhats)
        .then(() => {
          shareBtn.textContent = "✅ Copiado!";
          setTimeout(() => {
            shareBtn.textContent = "📋 Compartilhar";
          }, 2000);
        })
        .catch(err => console.error("Erro ao copiar:", err));
    });

    // Botão de exportar como imagem
    const exportBtn = document.createElement("button");
    exportBtn.textContent = "🖼️ Exportar";
    exportBtn.classList.add("exportar-btn");

    exportBtn.addEventListener("click", () => {
      html2canvas(contentDiv).then(canvas => {
        const link = document.createElement('a');
        link.download = `resultado-${jogo.dataHora.replace(/[^\d]/g, '')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    });

    // Botões
    const btnWrapper = document.createElement("div");
    btnWrapper.style.marginTop = "8px";
    btnWrapper.appendChild(shareBtn);
    btnWrapper.appendChild(exportBtn);
    resultDiv.appendChild(btnWrapper);

    container.appendChild(resultDiv);
  });
}

function limparHistorico() {
  localStorage.removeItem("historicoJogos");

  const container = document.getElementById("result");
  if (container) {
    container.innerHTML = "<p>Histórico apagado com sucesso.</p>";
  }

  // Alerta opcional
  alert("Histórico de jogos apagado com sucesso!");
}

