import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import '../styles/messages-style.css';

const Messages = ({ messages, name, theme }) => (
    <ScrollToBottom className={theme === "light" ? "lightMessages" : "darkMessages"}>
        {messages.map((message, index) =>
            
            <div key={index}>
                <Message theme={theme} message={message} name={name}/>
            </div>
        )}
    </ScrollToBottom>
)

export default Messages;