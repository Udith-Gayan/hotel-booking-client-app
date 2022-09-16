import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import classes from "./Hotels.module.css";
import HotelService from "./../../services/hotel-service";
import Spinner from "../Spinner/Spinner";

const Hotels = () => {
  const navigate = useNavigate();
  const hotelService = HotelService.instance;

  const [hotels, setHotels] = useState([]);
  const [isHotelsLoaded, setisHotelsLoaded] = useState(false);

  const getHotelList = async () => {
    console.log("Getting hotel list")
    try {
      const res = await hotelService.getHotels();
      console.log(res)
      setHotels(res.hotels);
      setisHotelsLoaded(true);
    } catch (error) {
      setisHotelsLoaded(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getHotelList();
  }, [hotelService]);

  const seeMore = (hObj) => {
    hotelService.setUserWalletAddress(hObj.HotelWalletAddress);
    hotelService.setHotelId(hObj.Id);
    navigate("/dashboard/hotel-overview")
  }


  return (
    <div>
      <h2 className="mt-3 mb-4 d-inline ">Hotels</h2>

      <Button
        variant="primary"
        className={classes.myReservationBtn}
        onClick={() => navigate("/dashboard/my-reservations")}
      >
        My Reservations
      </Button>

      <div className={classes.hotelListWrapper}>
        <Accordion defaultActiveKey="0">
          {!isHotelsLoaded && (<Spinner />)}
          {hotels.map((hotel, i) => { return (
            <Accordion.Item eventKey={i} key={i}>
              <Accordion.Header>{hotel.Name}</Accordion.Header>
              <Accordion.Body>
                {hotel.HotelWalletAddress}
                <div>
                  <Button
                    variant="primary"
                    onClick={() => seeMore(hotel)}
                  >
                    More Info
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

          )})}

        </Accordion>
      </div>
    </div>
  );
};

export default Hotels;
