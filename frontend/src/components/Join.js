import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ('../styles/join-style.css');


const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h2 className="heading">Welcome</h2>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
                <Link to={`/chat?name=${name}&room=${room}`}>
                    <button className="joinButton mt-20" type="submit">Sign In</button> 
                </Link>
            </div>
        </div>
    )
};

export default Join;
