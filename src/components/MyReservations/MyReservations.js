import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const MyReservations = () => {
  const navigate = useNavigate();
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
          <tr>
            <td>The Kingsbury Colombo</td>
            <td>Deluxe</td>
            <td>
              22D9E533BA3936ADEAA6708F9FB8C5B499B70B82E5D831682CEAE90A4ED6E683
            </td>
            <td>2022-01-15</td>
            <td>2022-01-30</td>
          </tr>
          <tr>
            <td>The Kingsbury Colombo</td>
            <td>Gold</td>
            <td>
              22D9E533BA3936ADEAA6708F9FB8C5B499B70B82E5D831682CEAE90A4ED6E683
            </td>
            <td>2022-03-15</td>
            <td>2022-03-30</td>
          </tr>
          <tr>
            <td>Marino Beach Colombo</td>
            <td>Platinum</td>
            <td>
              22D9E533BA3936ADEAA6708F9FB8C5B499B70B82E5D831682CEAE90A4ED6E683
            </td>
            <td>2022-02-15</td>
            <td>2022-02-30</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default MyReservations;
