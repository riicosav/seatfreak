import React, { useState } from "react";
import seatFreakLogo from "../../images/seatfreak3.png";

function Navbar({ setDatesAppear, setSeatingAppear, setHomeAppear }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`navbar ${menuOpen ? "responsive" : ""}`}>
      <div className="logo">
        <img
          onClick={setHomeAppear}
          src={seatFreakLogo}
          alt="Logo"
          className="navbar-brand"
          style={{ width: "140px" }}
        />
      </div>
      <div className={`buttons ${menuOpen ? "show" : ""}`}>
        <button className="button" onClick={setDatesAppear}>
          Add Movies
        </button>
        <button className="button button-my-movies" onClick={setSeatingAppear}>
          My Movies
        </button>
      </div>
      <a href="javascript:void(0);" className="icon" onClick={toggleMenu}>
        &#9776;
      </a>
    </div>
  );
}

export default Navbar;
