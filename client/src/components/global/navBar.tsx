import React, { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Search";
import Dropdown from "./menu";
const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
      <ul className="nav-item">
        <li className="menu-item">
          <Link to="/" className="navbar-logo child-item">
            <b>F</b>OOD<b>B</b>LOG
          </Link>
        </li>

        <li className="search-arera">
          <div className="searchbar">
            <Searchbar />
          </div>
        </li>
       
          <Dropdown />
        
        {/* <li className="menu-item">
          <div className="change-bg">
            <i className="fas fa-moon" id="icon" />
          </div>
        </li> */}
      </ul>
      </nav>
    
    </div>
  );
};

export default Navbar;