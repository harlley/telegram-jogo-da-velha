const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor("secondary_bg_color"); }

const groupsElement = document.querySelector("#groups");
const badge = document.querySelector("#badge");
const groupLabel = document.querySelector("#group-label");
const selection = document.querySelector("#selection");
const detail = document.querySelector("#detail");
const path = document.querySelector("#path");
const toggle = document.querySelector("#toggle-info");
const extra = document.querySelector("#extra-info");

const stages = [
  ["01", "Fase de 32", "32 seleções\n16 jogos"],
  ["02", "Oitavas", "16 seleções\n8 jogos"],
  ["03", "Quartas", "8 seleções\n4 jogos"],
  ["04", "Final", "2 seleções\n1 campeão"],
];

"ABCDEFGHIJKL".split("").forEach((letter, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `group${index === 0 ? " active" : ""}`;
  button.textContent = letter;
  button.setAttribute("aria-label", `Selecionar Grupo ${letter}`);
  button.addEventListener("click", () => selectGroup(letter, button));
  groupsElement.append(button);
});

function selectGroup(letter, button) {
  document.querySelectorAll(".group").forEach(item => item.classList.toggle("active", item === button));
  badge.textContent = letter;
  groupLabel.textContent = `GRUPO ${letter}`;
  selection.textContent = "Duas vagas diretas";
  detail.textContent = "1º e 2º lugares avançam à fase de 32.";
  tg?.HapticFeedback?.selectionChanged();
}

stages.forEach(([number, title, stat], index) => {
  const card = document.createElement("article");
  card.className = `stage${index === stages.length - 1 ? " final" : ""}`;
  card.innerHTML = `<div class="stage-number">${number}</div><h3>${title}</h3><span>${stat.replace("\n", "<br>")}</span>`;
  path.append(card);
});

toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!expanded));
  extra.hidden = expanded;
  tg?.HapticFeedback?.impactOccurred("light");
});
