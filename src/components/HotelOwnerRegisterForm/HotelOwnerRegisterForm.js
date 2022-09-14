import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import classes from "./HotelOwnerRegisterForm.module.css";
import ContractService from "./../../services/contract-service";
import HotelService from './../../services/hotel-service';

const HotelOwnerRegisterForm = () => {
  // const navigate = useNavigate();

 
  const contractService = ContractService.instance;
  const hotelService = HotelService.instance;


  const [hotelName, setHotelName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);

  const submitForm = useCallback(async () => {
    // toast.success("Registered successfully.");
    // navigate("/dashboard/hotel-overview");
    // await contractService.init();
    console.log("Submtted.");
    const regObj = {
      hotelName: hotelName,
      location: address,
      email: email
    }

    try {
      await contractService.init();
      const output = await hotelService.registerHotel(regObj);
      console.log('Register successfull');
      console.log(output);
    } catch (error) {
      console.log(error);
    }
  }, [contractService, hotelName, email, address, hotelService]);


  return (
    <div className={classes.pageLayout}>
      <Form>
        <Form.Group className="mb-3" controlId="hotelName">
          <Form.Label>Hotel Name</Form.Label>
          <Form.Control type="text" placeholder="Hotel Name" onChange={e => setHotelName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Hotel Location</Form.Label>
          <Form.Control type="text" placeholder="Hotel Address" onChange={e => setAddress(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={submitForm} >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default HotelOwnerRegisterForm;
