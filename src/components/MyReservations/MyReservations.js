import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import HotelService from "./../../services/hotel-service";

const MyReservations = () => {
  const navigate = useNavigate();

  const hotelService = HotelService.instance;

  const [bookings, setBookings] = useState([]);

  const getRoomBookings = async () => {
    try {
      const res = await hotelService.getMyBookings();
      setBookings(res.bookings);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomBookings();
  }, []);


  return (
    <div>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <h2 className="mt-3 mb-4">My Reservations</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Room Name</th>
            <th>Room ID</th>
            <th>Date From</th>
            <th>Date To</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((book, i) => (

            <tr>
              <td>{i + 1}</td>
              <td>{book.roomName}</td>
              <td>{book.customer}</td>
              <td>{book.fromDate}</td>
              <td>{book.toDate}</td>
            </tr>

          ))}

        </tbody>
      </Table>
    </div>
  );
};

export default MyReservations;
