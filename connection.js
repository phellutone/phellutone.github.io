let HOST = "wss://mso5-ws-s.herokuapp.com/c" //ws server address
let ws = new WebSocket(HOST);
let el;
let em;

function motionhandler(e){
  var data = {
    type: "a",
    x: e.acceleration.x,
    y: e.acceleration.y,
    z: e.acceleration.z
  }
  ws.send(JSON.stringify(data));
  em = document.getElementById("data");
  em.innerHTML = JSON.stringify(data);
}

function orientationhandler(e){
  var data = {
    type: "g",
    x: e.beta,
    y: e.gamma,
    z: e.alpha
  }
  ws.send(JSON.stringify(data));
  em = document.getElementById("orientation");
  em.innerHTML = JSON.stringify(data);
}

let bstate = false
let button = document.getElementById("button");
button.addEventListener("click", e => {
  e.preventDefault();
  
  if(DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function"){
    DeviceMotionEvent.requestPermission();
    //TODO: is available DeviceMotionEvent flag
  }

  if(DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission == "function"){
    DeviceOrientationEvent.requestPermission();
  }
  
  if(bstate){
    window.removeEventListener("devicemotion", motionhandler);
    window.removeEventListener("deviceorientation", orientationhandler);
    document.getElementById("button").innerHTML = "start";
    bstate = false;
  }else{
    window.addEventListener("devicemotion", motionhandler);
    window.addEventListener("deviceorientation", orientationhandler);
    document.getElementById("button").innerHTML = "stop";
    bstate = true;
  }
});



ws.onmessage = (event) => {
  el = document.getElementById("ws");
  el.innerHTML = event.data;
};

