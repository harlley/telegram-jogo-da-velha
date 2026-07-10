const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const options = ["09:00", "10:30", "14:00", "15:30", "17:00", "18:30"];
const slots = document.querySelector("#slots");
const confirm = document.querySelector("#confirm");
const feedback = document.querySelector("#feedback");
const payloadElement = document.querySelector("#payload");
let selected;

function payload() {
  return { type: "appointment_selection", date: "2026-07-14", time: selected, service: "consulta de demonstração" };
}

options.forEach(time => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "slot";
  button.textContent = time;
  button.addEventListener("click", () => {
    selected = time;
    document.querySelectorAll(".slot").forEach(item => item.classList.toggle("selected", item === button));
    confirm.disabled = false;
    feedback.textContent = `Horário selecionado: ${time}.`;
    payloadElement.textContent = JSON.stringify(payload());
    tg?.HapticFeedback?.selectionChanged();
  });
  slots.append(button);
});

confirm.addEventListener("click", () => {
  if (!selected) return;
  const data = JSON.stringify(payload());
  if (tg?.sendData) {
    tg.HapticFeedback?.notificationOccurred("success");
    tg.sendData(data);
  } else {
    feedback.textContent = `Demonstração: o bot receberia ${data}`;
  }
});
