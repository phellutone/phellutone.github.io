let HOST = "ws://mso5-ws-s.herokuapp.com/" //ws server address
let ws = new WebSocket(HOST);
let el;

ws.onmessage = (event) => {
  el = document.getElementById('ws');
  el.innerHTML = event.data;
};
