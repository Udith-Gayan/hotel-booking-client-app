import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./HotelOverview.module.css";
import CreateRoom from "../CreateRoom/CreateRoom";
import RoomBook from "../RoomBook/RoomBook";
import { Link, useNavigate } from "react-router-dom";

const HotelOverview = () => {
  const roomDetails = [
    {
      name: "Room Deluxe",
      id: "22D9E533BA3936ADEAA6708F9FB8C5B499B70B82E5D831682CEAE90A4ED6E683",
    },
    {
      name: "Room Platinum",
      id: "22D9E533BA3936ADEAA6708F9FB8C5B499B70B82E5D831682CEAE90A4ED6E683",
    },
    {
      name: "Room Gold",
      id: "22D9E533BA3936ADEAA6708F9FB8C5B499B70B82E5D831682CEAE90A4ED6E683",
    },
  ];

  const navigate = useNavigate();
  const [createRoomVisibility, setCreateRoomVisibility] = useState(false);
  const [bookRoomFormVisibility, setBookRoomFormVisibility] = useState(false);
  const [roomIndex, setRoomIndex] = useState(-1);

  const createRoom = () => {
    setCreateRoomVisibility(!createRoomVisibility);
  };

  const bookRoom = (index) => {
    console.log("booking a room", index);
    setRoomIndex(index);
    setBookRoomFormVisibility(!bookRoomFormVisibility);
  };
  return (
    <div>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
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
        {JSON.parse(localStorage.getItem("user")) === "hotelowner" && (
          <div>
            <Button variant="primary" onClick={() => createRoom()}>
              {!createRoomVisibility ? "Open " : "Close "}
              Room Creation Panel
            </Button>
          </div>
        )}
        {createRoomVisibility && (
          <div>
            <CreateRoom />
          </div>
        )}

        <div className={classes.cardWrapper}>
          {roomDetails.map((roomDetail, index) => (
            <Card
              id={4}
              key={index}
              style={{ width: "18rem", display: "inline-block", margin: "5px" }}
            >
              <Card.Body>
                <Card.Title>{roomDetail.name}</Card.Title>
                <Card.Text>{roomDetail.id}</Card.Text>
                {JSON.parse(localStorage.getItem("user")) === "customer" && (
                  <Button
                    variant="primary"
                    id={index}
                    onClick={() => bookRoom(index)}
                  >
                    Room Booking Panel
                  </Button>
                )}
                {/* replace index with relevant variable and once you navigate, you can access that variable from Room page. example provided */}
                {JSON.parse(localStorage.getItem("user")) === "hotelowner" && (
                  <Link to={`room/${index}`}>
                    <Button variant="primary">See Bookings</Button>
                  </Link>
                )}
                {bookRoomFormVisibility && roomIndex === index && <RoomBook />}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelOverview;
