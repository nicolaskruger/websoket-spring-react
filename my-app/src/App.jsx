import logo from './logo.svg';
import './App.css';
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";

function App() {

  const url = "http://localhost:8080/gs-guide-websocket"

  let stompClient;

  function conectar() {
    const soket = new SockJS(url);

    stompClient = Stomp.over(soket);

    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/greetings', function (greeting) {
        console.log(JSON.parse(greeting.body).content);
      });
    });

  }

  return (
    <div className="App">
      <button onClick={conectar}>
        conectar
      </button>
    </div>
  );
}

export default App;
