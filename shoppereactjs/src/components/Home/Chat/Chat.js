import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl('https://localhost:7033/chathub')
            .withAutomaticReconnect()
            .build();

        connect.start()
            .then(() => setConnection(connect))
            .catch(err => console.log('Connection failed: ', err));

        connect.on('ReceiveMessage', (user, message) => {
            setMessages(messages => [...messages, { user, message }]);
        });

        return () => {
            connect.stop();
        };
    }, []);

    const sendMessage = async () => {
        if (connection && message) {
            await connection.send('SendMessage', user, message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}><strong>{msg.user}:</strong> {msg.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
