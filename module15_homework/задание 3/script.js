const input = document.querySelector(".input");
const btnSend = document.querySelector(".button-send");
const btnGeo = document.querySelector(".button-geo");
const chat = document.querySelector(".chat");
const clear = document.querySelector(".clear");

const wsUri = "wss://echo-ws-service.herokuapp.com";
let webSocket = new WebSocket(wsUri);

webSocket.onopen = () => {
  console.log("connected");
};

webSocket.onmessage = ({ data }) => {
  innerChat(data, true);
};

webSocket.onerror = () => {
  console.log("error");
};

btnSend.addEventListener("click", () => {
  const message = input.value.trim();
  if (!message || webSocket.readyState !== WebSocket.OPEN) return;
  sendAndLogMessage(message);
  input.value = "";
});

btnGeo.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link = `https://www.openstreetmap.org/#map=17/${coords.latitude},${coords.longitude}`;
        writeOutput(
          `<a class="geo-info" href="${link}" target="_blank">Гео-локация</a>`
        );
      },
      ({ message }) => {
        console.error(`Ошибка геолокации: ${message}`);
        writeOutput("Местоположение не определено");
      }
    );
  }
});

function sendAndLogMessage(message) {
  webSocket.send(message);
  innerChat(message, false);
}

function innerChat(message, isReceived) {
  let messageHTML = `<div class="${
    isReceived ? "recieved" : "send"
  }">${message}</div>`;
  chat.insertAdjacentHTML("beforeend", messageHTML);
}

function writeOutput(message) {
  let messageHTML = `<span>${message}</span>`;
  chat.insertAdjacentHTML("beforeend", messageHTML);
}

clear.addEventListener("click", () => {
  chat.innerHTML = " ";
});