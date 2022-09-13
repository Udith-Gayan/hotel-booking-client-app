import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./HotelOverview.module.css";
import CreateRoom from "../CreateRoom/CreateRoom";

const HotelOverview = () => {
  const [createRoomVisibility, setCreateRoomVisibility] = useState(false);

  const createRoom = () => {
    setCreateRoomVisibility(!createRoomVisibility);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 className={classes.pageTitle}>Hotel Overview</h2>
      <FontAwesomeIcon icon={solid("hotel")} className={classes.hotelIcon} />

      <div className={classes.cardWrapper}>
        <p>
          <span className={classes.title}>Name:</span> The Kingsbury Colombo
        </p>
        <p>
          <span className={classes.title}>Email:</span> kingsburry@gmail.com
        </p>
        <p>
          <span className={classes.title}>Address:</span> Address: 48
          Janadhipathi Mawatha, Colombo
        </p>
      </div>
      <div>
        <Button variant="primary" onClick={() => createRoom()}>
          Open Room Creation Panel
        </Button>
      </div>
      {createRoomVisibility && (
        <div>
          <CreateRoom />
        </div>
      )}

      <div className={classes.cardWrapper}>
        <Card
          style={{ width: "18rem", display: "inline-block", margin: "5px" }}
        >
          <Card.Body>
            <Card.Title>Room Deluxe</Card.Title>
            <Card.Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "18rem", display: "inline-block", margin: "5px" }}
        >
          <Card.Body>
            <Card.Title>Room Platinum</Card.Title>
            <Card.Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "18rem", display: "inline-block", margin: "5px" }}
        >
          <Card.Body>
            <Card.Title>Room Gold</Card.Title>
            <Card.Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HotelOverview;
