import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className="bg-dark p-4 mt-8">
      <p className={classes.footerText}>
        Copyright © 2022 Hotel Booking System
      </p>
    </div>
  );
};

export default Footer;
