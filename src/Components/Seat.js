import { useState } from 'react';

function Seat({ seatData }) {

    const [isClicked, setIsClicked] = useState(seatData.selected);
    const [lockClicked, setLockClicked] = useState(seatData.selected);

    const clickHandle = (e) => {
        setIsClicked((isClicked)=> !isClicked);
        seatData.selected = !isClicked;
        console.log(seatData.selected);
    }   

    return (
        <div className={isClicked ? "seatClicked" : "seat"} onClick={lockClicked ? null : () => clickHandle()}></div>
        
    )

}

export default Seat;
