import React, { useEffect, useState } from 'react';

function ErrorPopup({ onAnimationEnd }) {
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
            <div className="popup-content-error">
                <h2> Error!</h2>
                <p>There is already an existing movie there.</p>
            </div>
        </div>
    );
};

export default ErrorPopup;