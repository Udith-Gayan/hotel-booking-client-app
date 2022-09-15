import React from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";

const Room = () => {
  const { id } = useParams();
  return (
    <div>
      {/* example mentioned */}
      Room {id}
      {/* example mentioned */}
      <h2 className="mt-3 mb-4">Room Bookings</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Room ID</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Booked By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Deluxe</td>
            <td>
              22D9E533BA3936ADEAA6708F9FB8C5B499B70B82E5D831682CEAE90A4ED6E683
            </td>
            <td>2022-01-15</td>
            <td>2022-01-30</td>
            <td>Lavern Harvey</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Room;
