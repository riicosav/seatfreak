import React, { useState } from "react";
import seatFreakLogo from "../../images/seatfreak3.png";

function Navbar({ setDatesAppear, setSeatingAppear }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`navbar ${menuOpen ? "responsive" : ""}`}>
      <div className="logo">
        <img
          src={seatFreakLogo}
          alt="Logo"
          className="navbar-brand"
          style={{ width: "150px" }}
        />
      </div>
      <div className={`buttons ${menuOpen ? "show" : ""}`}>
        <button className="button" onClick={setDatesAppear}>
          Add Movies
        </button>
        <button className="button" onClick={setSeatingAppear}>
          Schedules
        </button>
      </div>
      <a href="javascript:void(0);" className="icon" onClick={toggleMenu}>
        &#9776;
      </a>
    </div>
  );
}

export default Navbar;
