import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./CreateRoom.module.css";

const CreateRoom = () => {
  const notify = () => {
    console.log("create room");
  };
  return (
    <div className={classes.createRoomForm}>
      <Form>
        <Form.Group className="mb-3" controlId="roomName">
          <Form.Label>Room Name</Form.Label>
          <Form.Control type="text" placeholder="Room Name" />
        </Form.Group>
        <Button variant="primary" onClick={notify}>
          Submit Room Details
        </Button>
      </Form>
    </div>
  );
};

export default CreateRoom;
