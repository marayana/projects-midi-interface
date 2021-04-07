import React from 'react';
//import Logo from '../assets/gridflow_logo_01.svg';
//<img src={Logo} alt="Grid Flow Logo"/>

function Header({ isStart, updateIsStart }) {
    return (
        <header>
            <h1>
                <span>Grid Flow</span>
            </h1>
            {!isStart && (
                <div className="start-modal">
                    <button type="button" onClick={updateIsStart}>
                        START
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
