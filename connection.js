let HOST = "" //ws server address
let ws = new WebSocket(HOST);
let el;

ws.onmessage = (event) => {
  el = document.getElementById('ws');
  el.innerHTML = event.data;
};
