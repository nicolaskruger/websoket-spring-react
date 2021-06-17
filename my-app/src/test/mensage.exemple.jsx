
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

export function Mensage() {

    const url = "http://localhost:8080/gs-guide-websocket"

    const [sender, setSender] = useState("");

    const [receiver, setReceiver] = useState("");

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const [stompClient, setStompClient] = castStomp(useState(null))


    function conectar() {
        const soket = new SockJS(url);

        const stompC = Stomp.over(soket);



        stompC.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompC.subscribe("/topic/" + sender + "/queue/messages", function (greeting) {
                const { sender, msg } = JSON.parse(greeting.body);
                console.log(JSON.parse(greeting.body).content);

                setMessages((message) => [...message, `${sender}:${msg}`])

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
        stompClient.send("/app/chat", {}, JSON.stringify({
            sender,
            receiver,
            msg: message
        }));
    }

    return (
        <div>
            <div>
                <label htmlFor="">
                    sender
                    <input value={sender} type="text" onChange={(event) => { setSender(event.target.value) }} />
                </label>
                <button onClick={conectar}>
                    conectar
                </button>
                <button onClick={disconnect}>
                    desconectar
                </button>
            </div>
            <div>
                <label htmlFor="">
                    reciver
                    <input value={receiver} type="text" onChange={(event) => { setReceiver(event.target.value) }} />
                </label>
            </div>

            <div>
                <input type="text" value={message} onChange={(event) => { setMessage(event.target.value) }} />
                <button onClick={sendName}>
                    send
                </button>
            </div>
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