import Seat from "./Seat.js";

function Row({ seatData, addSelectedSeats, deleteSelectedSeats }) {
  return (
    <div className="row">
      {seatData.map((seat) => (
        <Seat
          key={seat.id}
          seatData={seat}
          addSelectedSeats={addSelectedSeats}
          deleteSelectedSeats={deleteSelectedSeats}
        />
      ))}
    </div>
  );
}

export default Row;
