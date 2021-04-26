import React from 'react';
import locationImg from '../images/location.png'
import '../styles/input-style.css';

const Input = ({ message, setMessage, sendMessage, sendLocation, theme }) => (  
    <form className={theme==="light" ? "form lightForm" : "form darkForm"}>
        <input
            className="input" 
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
            />

        <button className="sendButton" onClick={e => sendMessage(e)}>
            Send
        </button>
        <button className="sendButton" onClick={e => sendLocation(e)}>
            <img className="locationImg" src={locationImg} alt="location" />
        </button>
    </form>

);

export default Input;