import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    let socket = new WebSocket(null);

    useEffect(() => {
        // WebSocket 연결
        //socket = new WebSocket('ws://3.37.98.203:8090/socket.subway');

        socket.onopen = () => {
            console.log('WebSocket Connected');
            socket.send(JSON.stringify('아무거나'))
        };
        
        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        socket.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);
    
    const sendMessage = () => {
        if ( input) {
            socket.send(JSON.stringify(input));
            console.log(input);
            setInput('');
        } else console.log(socket.readyState)
    };

    return (
        <div>
            <h1>WebSocket Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default WebSocketComponent;
