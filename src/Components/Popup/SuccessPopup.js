import React, { useEffect, useState } from 'react';

function SuccessPopup ({ onAnimationEnd }) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (fadeOut) {
            const timer = setTimeout(onAnimationEnd, 300);
            return () => clearTimeout(timer);
        }
    }, [fadeOut, onAnimationEnd]);

    return (
        <div className={`popup-overlay ${fadeOut ? 'fade-out' : ''}`}>
            <div className="popup-content">
                <h2>Successfully Saved</h2>
                <p>Your changes have been saved successfully!</p>
            </div>
        </div>
    );
};

export default SuccessPopup;