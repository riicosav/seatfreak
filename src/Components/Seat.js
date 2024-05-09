import { useState } from 'react';

function Seat({ seatData }) {

    const [isClicked, setIsClicked] = useState(seatData.selected);

    const clickHandle = (e) => {
        setIsClicked((isClicked)=> !isClicked);
        seatData.selected = !isClicked;
        console.log(seatData.selected);
    }   

    return (
        <div className={isClicked ? "seatClicked" : "seat"} onClick={() => clickHandle()}></div>
        
    )


}

export default Seat;