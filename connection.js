let HOST = "wss://mso5-ws-s.herokuapp.com/" //ws server address
let ws = new WebSocket(HOST);
let el;

let bstate = false
let button = document.getElementById("button");
button.addEventListener("click", e => {
  e.preventDefault();
  
  if(DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function"){
    DeviceMotionEvent.requestPermission();
  }
  
  if(bstate){
    window.removeEventListener("devicemotion");
    document.getElementById("button").innerHTML = "start";
    bstate = false
  }else{
    window.addEventListener("devicemotion", e => {
      ws.send(e.acceleration.x+":"+e.acceleration.y+":"+e.acceleration.z);
    });
    document.getElementById("button").innerHTML = "stop";
    bstate = true;
  }
});



ws.onmessage = (event) => {
  el = document.getElementById('ws');
  el.innerHTML = event.data;
};

