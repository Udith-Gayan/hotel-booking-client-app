import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./HotelOwnerRegisterForm.module.css";
import { useNavigate } from "react-router-dom";
const HotelOwnerLoginForm = () => {
  const navigate = useNavigate();
  const Login = () => {
    navigate("/dashboard/hotel-owner-login-overview");
    console.log("Login");
  };
  return (
    <div className={classes.pageLayout}>
      <Form>
        <Form.Group className="mb-3" controlId="secret">
          <Form.Label>Enter Secret</Form.Label>
          <Form.Control type="text" placeholder="Enter Secret" />
        </Form.Group>

        <Button variant="primary" onClick={() => Login()}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default HotelOwnerLoginForm;
