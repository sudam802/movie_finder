import React from "react";
import "../../styles/pages/rides.css";

export default function RideSummary({ summary, pickup, destination }) {
  const { distance, duration } = summary;

  // Example simple fare estimate
  const baseFare = 5; // base fare in $
  const perKm = 1.5; // $ per km
  const fare = (baseFare + distance * perKm).toFixed(2);

  return (
    <div className="ride-summary">
      <h3>Ride Summary</h3>
      <div className="ride-summary-details">
        <p><strong>From:</strong> {pickup}</p>
        <p><strong>To:</strong> {destination}</p>
        <p><strong>Distance:</strong> {distance} km</p>
        <p><strong>Estimated Duration:</strong> {duration} hours</p>
        <p><strong>Estimated Fare:</strong> ${fare}</p>
      </div>
    </div>
  );
}
