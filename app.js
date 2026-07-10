const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor("secondary_bg_color"); }

const groups = "ABCDEFGHIJKL".split("");
const groupElement = document.querySelector("#groups");
const bracketElement = document.querySelector("#bracket");
const selection = document.querySelector("#selection");

const rounds = [
  { title: "Fase de 32", games: Array.from({ length: 16 }, (_, i) => `Classificados — jogo ${i + 1}`) },
  { title: "Oitavas", games: Array.from({ length: 8 }, (_, i) => `Vencedores da fase de 32 — jogo ${i + 1}`) },
  { title: "Quartas", games: Array.from({ length: 4 }, (_, i) => `Vencedores das oitavas — jogo ${i + 1}`) },
  { title: "Semifinal e final", games: ["Vencedores das quartas — semifinal 1", "Vencedores das quartas — semifinal 2", "Vencedores das semifinais — final"] },
];

groups.forEach(letter => {
  const button = document.createElement("button");
  button.className = "group";
  button.type = "button";
  button.innerHTML = `<strong>Grupo ${letter}</strong><span>1º e 2º: classificação direta</span>`;
  button.addEventListener("click", () => {
    document.querySelectorAll(".group").forEach(item => item.classList.toggle("active", item === button));
    selection.textContent = `Grupo ${letter}: 1º e 2º avançam; o 3º disputa uma das oito vagas por índice.`;
    tg?.HapticFeedback?.selectionChanged();
  });
  groupElement.append(button);
});

rounds.forEach(round => {
  const column = document.createElement("section");
  column.className = "round";
  column.innerHTML = `<h3>${round.title}</h3><div class="fixtures">${round.games.map((game, i) => `<article class="fixture"><strong>Jogo ${i + 1}</strong><span class="team pending">${game}</span></article>`).join("")}</div>`;
  bracketElement.append(column);
});
