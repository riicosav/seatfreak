import { useState } from 'react';

function Seat({ seatData, addSelectedSeats, deleteSelectedSeats}) {

    const [isClicked, setIsClicked] = useState(seatData.selected);
    const [lockClicked, setLockClicked] = useState(seatData.selected);
  
    const clickHandle = (e) => {
        setIsClicked((isClicked)=> !isClicked);
        seatData.selected = !isClicked;
        console.log(seatData.selected);
        if(!isClicked) {
            console.log("hello!!");
            addSelectedSeats(seatData.name);

        } else {
            console.log("nahh!!!");
            deleteSelectedSeats(seatData.name);
        }
    }   

    return (
        <div className={isClicked ? "seatClicked" : "seat"} onClick={lockClicked ? null : () => clickHandle()}></div>
        
    )

}

export default Seat;
