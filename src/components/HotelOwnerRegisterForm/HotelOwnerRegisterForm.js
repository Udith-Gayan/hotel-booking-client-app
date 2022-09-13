import React, { useCallback } from "react";
import ContractService from "../../services/contract-service";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import classes from "./HotelOwnerRegisterForm.module.css";

const HotelOwnerRegisterForm = () => {
  const navigate = useNavigate();

  const hotelRegObject = { type: "getAllBookings" };
  const contractService = ContractService.instance;
  const handleChangeAddress = useCallback(async () => {
    toast.success("Registered successfully.");
    navigate("/dashboard/hotel-overview");
    await contractService.init();
    console.log("button clicked by udith");

    try {
      const output = await contractService.requestHotelRegistration(
        hotelRegObject
      );
      console.log(output);
    } catch (error) {
      console.log(error);
    }
  }, [hotelRegObject]);
  return (
    <div className={classes.pageLayout}>
      <Form>
        <Form.Group className="mb-3" controlId="hotelName">
          <Form.Label>Hotel Name</Form.Label>
          <Form.Control type="text" placeholder="Hotel Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Hotel Address</Form.Label>
          <Form.Control type="text" placeholder="Hotel Address" />
        </Form.Group>

        <Button variant="primary" onClick={handleChangeAddress}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default HotelOwnerRegisterForm;
