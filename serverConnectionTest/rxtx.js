let HOST = "wss://mso5-ws-s.herokuapp.com/" //ws server address
let ws = new WebSocket(HOST)
let sendstate = false

const fetchCharacteristic = async () => {
  const serviceUUID = 'd5875408-fa51-4763-a75d-7d33cecebc31'
  const characteristicUUID = 'a4f01d8c-a037-43b6-9050-1876a8c23584'
  const options = {
    filters: [{name: 'NefryBT'}],
    optionalServices: [serviceUUID]
  }

  const device = await navigator.bluetooth.requestDevice(options)
  const server = await device.gatt.connect()
  const service = await server.getPrimaryService(serviceUUID)
  const characteristic = await service.getCharacteristic(characteristicUUID)
  return characteristic
}

const handler = (event) => {
  const value = event.target.value
  const string = new TextDecoder().decode(value)
  const json = JSON.parse(string)
  
  if(sendstate){
    ws.send(string)
  }

  const dataText = document.getElementById('data')
  dataText.innerHTML = string
}

const connectButton = document.getElementById('connectButton')
connectButton.addEventListener('click', async () => {
  const characteristic = await fetchCharacteristic()
  characteristic.addEventListener('characteristicvaluechanged', handler)
  characteristic.startNotifications()
})

const sendButton = document.getElementById('sendButton')
sendButton.addEventListener('click', () => {
  sendstate = !sendstate
})

ws.onmessage = (event) => {
  const rxdata = document.getElementById('ws')
  rxdata.innerHTML = event.data;
};
