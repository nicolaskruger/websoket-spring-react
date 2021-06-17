import logo from './logo.svg';
import './App.css';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useState } from 'react';

/**
 * 
 * @param {*} any 
 * @returns {[CompatClient, (n:any)=>void]}
 */
function castStomp(any) {
  return any;
}

function App() {

  const url = "http://localhost:8080/gs-guide-websocket"

  const [name, setName] = useState("");

  const [messages, setMessages] = useState([]);

  const [stompClient, setStompClient] = castStomp(useState(null))


  function conectar() {
    const soket = new SockJS(url);

    const stompC = Stomp.over(soket);



    stompC.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompC.subscribe('/topic/greetings', function (greeting) {
        const content = JSON.parse(greeting.body).content;
        console.log(JSON.parse(greeting.body).content);

        setMessages((message) => [...message, content])

      });
    });

    setStompClient(stompC);

  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    console.log("Disconnected");
  }



  function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({ 'name': name }));
  }

  return (
    <div className="App">
      <button onClick={conectar}>
        conectar
      </button>
      <button onClick={disconnect}>
        desconectar
      </button>
      <input value={name} type="text" onChange={(event) => { setName(event.target.value) }} />
      <button onClick={sendName}>
        send
      </button>
      <ul>
        {messages.map(messge => (
          <li>
            {messge}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
