import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Chat from './Chat';
import "./LiveChat.css";

const socket = io.connect("http://localhost:3001");



const LiveChat = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };
    return (
        <div className='LiveChat'>
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join Your MeetRoom</h3>
                    <input
                        type="text"
                        placeholder="John..."
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join A Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
};

export default LiveChat;