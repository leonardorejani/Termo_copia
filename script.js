const palavras = ["tenro", "trapo", "tacho", "turvo", "toque", "touro"];
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();

const tabuleiro = document.getElementById("tabuleiro");
const teclado = document.getElementById("teclado");

let linha = 0;
let coluna = 0;
let tentativa = ["", "", "", "", "", ""]; // máximo 6 tentativas

// Cria o tabuleiro
for (let i = 0; i < 30; i++) {
  const celula = document.createElement("div");
  celula.classList.add("celula");
  celula.setAttribute("id", `celula-${i}`);
  tabuleiro.appendChild(celula);
}

// Teclado virtual
const letras = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
letras.push("ENTER", "⌫");

letras.forEach(letra => {
  const btn = document.createElement("button");
  btn.textContent = letra;
  btn.classList.add("tecla");
  btn.addEventListener("click", () => pressionarTecla(letra));
  teclado.appendChild(btn);
});

function pressionarTecla(tecla) {
  if (linha >= 6) return;

  if (tecla === "ENTER") {
    if (coluna === 5) checarPalavra();
    return;
  }

  if (tecla === "⌫") {
    if (coluna > 0) {
      coluna--;
      tentativa[linha] = tentativa[linha].slice(0, -1);
      document.getElementById(`celula-${linha * 5 + coluna}`).textContent = "";
    }
    return;
  }

  if (coluna < 5 && /^[A-Z]$/.test(tecla)) {
    document.getElementById(`celula-${linha * 5 + coluna}`).textContent = tecla;
    tentativa[linha] += tecla;
    coluna++;
  }
}

function checarPalavra() {
  const palavra = tentativa[linha];
  const letrasSecreta = palavraSecreta.split("");

  for (let i = 0; i < 5; i++) {
    const celula = document.getElementById(`celula-${linha * 5 + i}`);
    const letra = palavra[i];

    if (letra === palavraSecreta[i]) {
      celula.classList.add("verde");
    } else if (letrasSecreta.includes(letra)) {
      celula.classList.add("amarelo");
    } else {
      celula.classList.add("cinza");
    }
  }

  if (palavra === palavraSecreta) {
    setTimeout(() => alert("Parabéns! Você acertou!"), 100);
  } else {
    linha++;
    coluna = 0;
    if (linha === 6) {
      setTimeout(() => alert(`A palavra era: ${palavraSecreta}`), 100);
    }
  }
}
