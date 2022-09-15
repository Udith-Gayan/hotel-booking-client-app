import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./HotelOwnerRegisterForm.module.css";
import { useNavigate } from "react-router-dom";
import HotelService from "./../../services/hotel-service";
import toast from "react-hot-toast";

const HotelOwnerLoginForm = () => {
  const navigate = useNavigate();
  const hotelService = HotelService.instance;

  const [secret, setSecret] = useState(null);

  const Login = async () => {
    try {
      await hotelService.setUserWallet(secret, true);
      toast.success("Login success");
      navigate("/dashboard/hotel-owner-login-overview");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.pageLayout}>
      <Form>
        <Form.Group className="mb-3" controlId="secret">
          <Form.Label>Enter Secret</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Secret"
            onChange={(e) => setSecret(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={() => Login()}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default HotelOwnerLoginForm;
