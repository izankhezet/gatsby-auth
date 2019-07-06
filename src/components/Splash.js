import React from 'react';

const Splash = (props) => {
    return (
        <div style={{
            position:'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: 'purpple',
            zIndex: 1000,
            color: 'white'
        }}>
            <h1>Splash Screen</h1>
        </div>
    )
}
export default Splash