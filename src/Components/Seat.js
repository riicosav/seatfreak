import { useState } from 'react';

function Seat({ seatData }) {

    const [isClicked, setIsClicked] = useState(false);

    const clickHandle = (e) => {
        setIsClicked((isClicked)=> !isClicked);
    }   

    return (
        <div className={isClicked ? "seatClicked" : "seat"} onClick={() => clickHandle()}></div>
        
    )


}

export default Seat;