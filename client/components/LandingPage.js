import React from 'react';

export default function LandingPage() {
    return(
        <>
            <h1>Welcome to Grace Shockers, where the only thing spoooookier than Halloween is how low our prices are!</h1>
            <div id='landing-div'>
              <img id='landing-image' src="/costumeImages/pumpkin.png" />
              <a className="speech">Enter at your own risk</a>
              {/* <img id='bubble' src="/costumeImages/bubble.png" /> */}
            </div>
        </>
    )    
};

