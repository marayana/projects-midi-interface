import React from 'react';

function Popup({ updateShowPopup }) {
    return (
        <div className="popup">
            <div>
                <span>Single-Light-Mode is only available for MIDI controllers with multiple channels.</span>
            </div>
            <div>
                <a href="#multiple-channel-setup" className="btn">
                    More info below &darr;
                </a>
                <button className="btn" onClick={updateShowPopup}>
                    Don't show again
                </button>
            </div>
        </div>
    );
}

export default Popup;
