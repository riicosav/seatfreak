import seatFreakLogo from "../../images/seatfreak3.png";
function Navbar({ setDatesAppear, setSeatingAppear }) {
  return (
    <div className="navbar">
      <div className="logo">
        <img
          src={seatFreakLogo}
          alt="Logo"
          className="navbar-brand"
          style={{ width: "140px" }}
        />
      </div>
      <div className="buttons">
        <button className="button" onClick={setDatesAppear}>
          Add Movies
        </button>
        <button className="button button-my-movies" onClick={setSeatingAppear}>
          My Movies
        </button>
      </div>
    </div>
  );
}

export default Navbar;
