import React, { useState } from "react";
//import { Link } from "react-router-dom";
import classes from "./LandingPage.module.css";
import Button from "react-bootstrap/Button";
import "../Shared/styles/common.css";
import HotelOwnerRegisterForm from "../HotelOwnerRegisterForm/HotelOwnerRegisterForm";

const LandingPage = () => {
  const [customerLogVisibility, setCustomerLogVisibility] = useState(false);
  const [hotelOwnerLogVisibility, setHotelOwnerLogVisibility] = useState(false);
  const [customerRegisterVisibility, setCustomerRegisterVisibility] =
    useState(false);
  const [customerLoginVisibility, setCustomerLoginVisibility] = useState(false);
  const [hotelOwnerRegisterVisibility, setHotelOwnerRegisterVisibility] =
    useState(false);
  const [hotelOwnerLoginVisibility, setHotelOwnerLoginVisibility] =
    useState(false);

  const [
    hotelOwnerRegisterFormVisibility,
    setHotelOwnerRegisterFormVisibility,
  ] = useState(false);
  const customerClick = () => {
    setCustomerLogVisibility(!customerLogVisibility);
    setCustomerRegisterVisibility(!customerRegisterVisibility);
    setCustomerLoginVisibility(!customerLoginVisibility);
  };

  const hotelOwnerClick = () => {
    setHotelOwnerLogVisibility(!hotelOwnerLogVisibility);
    setHotelOwnerRegisterVisibility(!hotelOwnerRegisterVisibility);
    setHotelOwnerLoginVisibility(!hotelOwnerLoginVisibility);
  };

  const customerRegister = () => {
    console.log("customerRegister");
  };

  const customerLogin = () => {
    console.log("customerLogin");
  };

  const hotelOwnerRegister = () => {
    console.log("hotelOwnerRegister");
    setHotelOwnerRegisterFormVisibility(!hotelOwnerRegisterFormVisibility);
    setHotelOwnerRegisterVisibility(!hotelOwnerRegisterVisibility);
    setHotelOwnerLoginVisibility(!hotelOwnerLoginVisibility);
  };

  const hotelOwnerLogin = () => {
    console.log("hotelOwnerLogin");
  };
  return (
    <div className={classes.landingPageBackground}>
      <div className={classes.box}>
        {hotelOwnerRegisterFormVisibility && <HotelOwnerRegisterForm />}

        <div>
          {!(customerLogVisibility || hotelOwnerLogVisibility) && (
            <Button
              variant="warning"
              className="m-2 p-3"
              onClick={() => customerClick()}
            >
              Are you looking for Hotel?
            </Button>
          )}

          {customerRegisterVisibility && (
            <Button
              variant="warning"
              className="m-2 p-3"
              onClick={() => customerRegister()}
            >
              Register
            </Button>
          )}

          {customerLoginVisibility && (
            <Button
              variant="warning"
              className="m-2 p-3"
              onClick={() => customerLogin()}
            >
              Login
            </Button>
          )}

          {!(customerLogVisibility || hotelOwnerLogVisibility) && (
            <Button
              variant="warning"
              className="m-2 p-3"
              onClick={() => hotelOwnerClick()}
            >
              Are you a Hotel Owner?
            </Button>
          )}

          {hotelOwnerRegisterVisibility && (
            <Button
              variant="warning"
              className="m-2 p-3"
              onClick={() => hotelOwnerRegister()}
            >
              Register
            </Button>
          )}

          {hotelOwnerLoginVisibility && (
            <Button
              variant="warning"
              className="m-2 p-3"
              onClick={() => hotelOwnerLogin()}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
