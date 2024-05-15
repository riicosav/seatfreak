import Column from "./Column.js";

function Theatre({ seatData, addSelectedSeats, deleteSelectedSeats }) {
  return (
    <div className="row">
      {seatData.map((column) => (
        <Column
          key={column.id}
          seatData={column.column}
          addSelectedSeats={addSelectedSeats}
          deleteSelectedSeats={deleteSelectedSeats}
        />
      ))}
    </div>
  );
}

export default Theatre;
