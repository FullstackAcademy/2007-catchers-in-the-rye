import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return(
        <>
            <h1>Welcome to Grace Shockers, where the only thing spookier than our costumes is how low the prices are!</h1>
            <div id='landing-div'>
              <img id='landing-image' src="/costumeImages/pumpkin.png" />
              <Link to='/categories/all' id="talkbubble">Enter at your own risk</Link>
              {/* <img id='bubble' src="/costumeImages/bubble.png" /> */}
            </div>
        </>
    )    
};

