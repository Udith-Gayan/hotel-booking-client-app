import React from "react";
import classes from "./Navbar.module.css";
function Navbar() {
  return (
    <div className="bg-dark p-4 mt-8">
      <p className={classes.headerText}>Hotel Owner Dashboard</p>
    </div>
  );
}

export default Navbar;
