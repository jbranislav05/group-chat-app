import React from 'react';
import '../styles/message-style.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text, time }, name, theme }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        isSentByCurrentUser = true;
    }
    return(
        isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className={theme==="light" ? "sentText pr-5 nameLight" : "sentText pr-5 nameDark"}>{name}</p>
                  <div className="messageBox mr backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p> 
                  </div>
                  <div className="messageBox mr3">
                  <p className="messageText colorDark">{time}</p>
              </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
              <div className="messageBox mr3 backgroundLight">
                <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p> 
              </div>
              <div className="messageBox ">
                <p className="messageText colorDark">{time}</p>
              </div>
              <p className={theme==="light" ? "sentText pl-5 nameLight" : "sentText pl-5 nameDark"}>{user}</p>
            </div>
        )
    )
}

export default Message;