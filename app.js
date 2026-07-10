const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor("secondary_bg_color"); }

const matches = [
  ["🇿🇦", "África do Sul", "🇨🇦", "Canadá"],
  ["🇧🇷", "Brasil", "🇯🇵", "Japão"],
  ["🇩🇪", "Alemanha", "🇵🇾", "Paraguai"],
  ["🇳🇱", "Países Baixos", "🇲🇦", "Marrocos"],
  ["🇨🇮", "Costa do Marfim", "🇳🇴", "Noruega"],
  ["🇫🇷", "França", "🇸🇪", "Suécia"],
  ["🇲🇽", "México", "🇪🇨", "Equador"],
  ["🇬🇧", "Inglaterra", "🇨🇩", "República Democrática do Congo"],
  ["🇧🇪", "Bélgica", "🇸🇳", "Senegal"],
  ["🇺🇸", "Estados Unidos", "🇧🇦", "Bósnia e Herzegovina"],
  ["🇪🇸", "Espanha", "🇦🇹", "Áustria"],
  ["🇵🇹", "Portugal", "🇭🇷", "Croácia"],
  ["🇨🇭", "Suíça", "🇩🇿", "Argélia"],
  ["🇦🇺", "Austrália", "🇪🇬", "Egito"],
  ["🇦🇷", "Argentina", "🇨🇻", "Cabo Verde"],
  ["🇨🇴", "Colômbia", "🇬🇭", "Gana"],
];

const matchups = document.querySelector("#matchups");
matches.forEach(([flagA, nameA, flagB, nameB]) => {
  const card = document.createElement("article");
  card.className = "match";
  card.setAttribute("aria-label", `${nameA} contra ${nameB}`);
  card.title = `${nameA} × ${nameB}`;
  card.innerHTML = `<span class="flag" aria-hidden="true">${flagA}</span><span class="flag" aria-hidden="true">${flagB}</span>`;
  matchups.append(card);
});
