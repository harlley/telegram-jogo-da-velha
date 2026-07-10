const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor("secondary_bg_color");
}

const boardElement = document.querySelector("#board");
const statusElement = document.querySelector("#status");
const resetButton = document.querySelector("#reset");
const shareButton = document.querySelector("#share");
const scores = { X: 0, O: 0, draw: 0 };
let board;
let active;
let gameOver;

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getWinner(state) {
  for (const [a, b, c] of lines) {
    if (state[a] && state[a] === state[b] && state[a] === state[c]) return state[a];
  }
  return state.every(Boolean) ? "draw" : null;
}

function bestBotMove(state) {
  const empty = state.map((value, index) => value ? null : index).filter(Number.isInteger);
  for (const marker of ["O", "X"]) {
    for (const index of empty) {
      const copy = [...state]; copy[index] = marker;
      if (getWinner(copy) === marker) return index;
    }
  }
  if (!state[4]) return 4;
  const corners = [0, 2, 6, 8].filter(index => !state[index]);
  return (corners.length ? corners : empty)[Math.floor(Math.random() * (corners.length || empty.length))];
}

function render() {
  boardElement.innerHTML = "";
  board.forEach((value, index) => {
    const button = document.createElement("button");
    button.className = `cell ${value ? value.toLowerCase() : ""}`;
    button.type = "button";
    button.disabled = Boolean(value) || gameOver || !active;
    button.textContent = value || "";
    button.setAttribute("aria-label", value ? `Casa ${index + 1}: ${value}` : `Casa ${index + 1}, vazia`);
    button.addEventListener("click", () => humanMove(index));
    boardElement.append(button);
  });
  document.querySelector("#human-score").textContent = scores.X;
  document.querySelector("#bot-score").textContent = scores.O;
  document.querySelector("#draw-score").textContent = scores.draw;
}

function finish(result) {
  gameOver = true;
  scores[result] += 1;
  statusElement.textContent = result === "draw" ? "Empate. Nenhum humano foi derrotado." : result === "X" ? "Você venceu." : "O bot venceu esta rodada.";
  tg?.HapticFeedback?.notificationOccurred(result === "X" ? "success" : result === "O" ? "error" : "warning");
  render();
}

function humanMove(index) {
  if (board[index] || gameOver || !active) return;
  board[index] = "X";
  tg?.HapticFeedback?.impactOccurred("light");
  const result = getWinner(board);
  if (result) return finish(result);
  active = false;
  statusElement.textContent = "Bot processando…";
  render();
  setTimeout(botMove, 380);
}

function botMove() {
  const index = bestBotMove(board);
  board[index] = "O";
  const result = getWinner(board);
  if (result) return finish(result);
  active = true;
  statusElement.textContent = "Sua vez.";
  render();
}

function resetRound() {
  board = Array(9).fill(""); active = true; gameOver = false;
  statusElement.textContent = "Sua vez.";
  render();
}

resetButton.addEventListener("click", resetRound);
shareButton.addEventListener("click", () => {
  const message = `Jogo da Velha — Eu ${scores.X} × ${scores.O} Bot (${scores.draw} empates)`;
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(message)}`);
  } else if (navigator.share) {
    navigator.share({ title: "Jogo da Velha", text: message, url: location.href });
  } else {
    navigator.clipboard?.writeText(message);
    statusElement.textContent = "Placar copiado.";
  }
});

resetRound();
