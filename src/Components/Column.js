import Row from "./Row.js";

function Column({ seatData, addSelectedSeats, deleteSelectedSeats }) {
  return (
    <div className="col mx-3">
      {seatData.map((row) => (
        <Row
          key={row.id}
          seatData={row.row}
          addSelectedSeats={addSelectedSeats}
          deleteSelectedSeats={deleteSelectedSeats}
        />
      ))}
    </div>
  );
}

export default Column;
