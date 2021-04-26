import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import queryString from 'query-string';
import io from 'socket.io-client';
import ChatInfoBar from './ChatInfoBar';
import Messages from './Messages';
import Input from './Input.js';
import '../styles/chat-style.css';
import '../styles/dark-mode-style.css'

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const [locationMessage, setLocationMessage] = useState('');
    const [flag, setFlag] = useState(0);
    const [theme, setTheme] = useState("light");

    const ENDPOINT = 'localhost:5000';


    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if(error){
                alert(error);
                setFlag(1);
            }
        });

    },[ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            //nadogradnja nove poruke na stare
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })
    },[messages]);

    useEffect(() => {
        socket.on('location', (locationMessage) => {

            setMessages([...messages, locationMessage]);
        })
    },[locationMessage, messages])

    //error redirect
    if(flag){
        return (
            <Redirect to = "/" />
        )
    }

    //sending messages function
    const sendMessage = (e) => {

        e.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }

    };
    //sending location function
    const sendLocation = (e) => {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)

            const url = `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;

            socket.emit('sendLocation', {
                location: url
            }, () => setLocationMessage(''));
        })
    }

    //dark mode switch
    const switchTheme = (e) => {
        if(theme==="light"){
            setTheme("dark");
        }
        else if(theme==="dark"){
            setTheme("light")
        }
    }


    return (
    <div className={theme==="light" ? "outerContainer bgLight" : "outerContainer bgDark"}>
        <div className="container">
            <ChatInfoBar theme={theme} users={users} room={room}/>
            <Messages theme={theme} messages={messages} name={name} />
            <Input theme={theme} message={message} setMessage={setMessage} sendMessage={sendMessage} sendLocation={sendLocation}/>
        </div>
        <div className="positionDark">
            <h2 className="darkModeText">Dark mode:</h2>
            <button
            className={theme==="light" ? "darkMode notClicked" : "darkMode clicked"}
            onClick={() => switchTheme()}></button>
        </div>
    </div>
)};

export default Chat;