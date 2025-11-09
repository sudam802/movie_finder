import { useState } from "react";
import RideSearchBar from "../components/rides/RideSearchBar";
import RideMap from "../components/rides/RideMap";
import "../styles/pages/rides.css";

export default function Rides() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  return (
    <div className="rides-page">
      <h2>Book a Ride</h2>
      <RideSearchBar
        pickup={pickup}
        setPickup={setPickup}
        destination={destination}
        setDestination={setDestination}
        setCoordinates={setCoordinates}
      />
      <RideMap pickup={pickup} destination={destination} coordinates={coordinates} />
    </div>
  );
}
