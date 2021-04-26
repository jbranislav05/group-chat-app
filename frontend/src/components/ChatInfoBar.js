import React from 'react';
import onlineIcon from '../images/onlineIcon.png';
import closeIcon from '../images/closeIcon.png';
import TextContainer from './TextContainer';
import '../styles/infobar-style.css';
import "../styles/dark-mode-style.css"



const ChatInfoBar = ({ room, users, theme }) => {
    
    const trimmedRoom = room.trim().toLowerCase();
    
    return(
    <div className={theme === "light" ? "infoBar bgLight" : "infoBar bgDark"}>
    
        <div className="circle">
            <img className="onlineIcon" src={onlineIcon} alt="online"/>
        </div>
        <div className="leftInnerContainer">
            <h3>{trimmedRoom}</h3>
        </div>

        <TextContainer users={users} />
        <div className="rightInnerContainer">

            <a className="closeIcon" href="/"><img src={closeIcon} alt="close"/></a>
        </div>
    </div>

)};

export default ChatInfoBar;