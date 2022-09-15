import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RoomBook = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="datefrom">
          <Form.Label>Date From</Form.Label>
          <Form.Control type="date" placeholder="Date From" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dateto">
          <Form.Label>Date To</Form.Label>
          <Form.Control type="date" placeholder="Date To" />
        </Form.Group>
        <Button variant="primary">Submit</Button>
      </Form>
    </div>
  );
};

export default RoomBook;
