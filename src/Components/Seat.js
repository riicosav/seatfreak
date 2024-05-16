import { useState } from "react";

function Seat({ seatData, addSelectedSeats, deleteSelectedSeats }) {
  const [isClicked, setIsClicked] = useState(seatData.selected);
  const [lockClicked, setLockClicked] = useState(seatData.selected);

  const clickHandle = (e) => {
    setIsClicked((isClicked) => !isClicked);
    seatData.selected = !isClicked;
    console.log(seatData.selected);
    if (!isClicked) {
      
      addSelectedSeats(seatData.name);
    } else {
      setLockClicked(false);
      deleteSelectedSeats(seatData.name);
    }
  };

  let design = "seat";
  if (isClicked) {
    design = "seatClicked";
  } else {
    design = "seat";
  }

  if (lockClicked && isClicked) {
    design = "seatBooked";
  }

  return (
    <div
      className={design}
      onClick={() => clickHandle()}
    ></div>
  );
}

export default Seat;
