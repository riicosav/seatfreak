import React, { useState } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import seatFreakLogo from "../../images/seatfreak3.png";
import jans from "../../images/jans.png";

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
          src={jans} // testing lang pre
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
        <button className="button button-my-movies" onClick={setSeatingAppear}>
          Seats
        </button>
      </div>
      {/* <a href="#" className="icon" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={menuOpen ? faXmark : faBars}
          className="menu-icon"
        />
      </a> */}
    </div>
  );
}

export default Navbar;
