import { useState } from "react";

export default function RideSearchBar({ pickup, setPickup, destination, setDestination, setCoordinates }) {
  console.log("RideSearchBar rendered");
  const [loading, setLoading] = useState(false);

  const geocodeLocation = async (locationName) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`
    );
    const data = await response.json();
    if (data.length > 0) {
        console.log("Geocoding result for", locationName, ":", data[0]);
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } else {
        console.log("No results found for location:", locationName);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!pickup) return;
    setLoading(true);

    const pickupCoords = await geocodeLocation(pickup);
    const destCoords = destination ? await geocodeLocation(destination) : null;

    if (pickupCoords) {
      setCoordinates({
        pickup: pickupCoords,
        destination: destCoords,
      });
    } else {
      alert("Could not find that location. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="ride-search-bar">
      <input
        type="text"
        placeholder="Pickup location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination (optional)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleSearch} disabled={!pickup || loading}>
        {loading ? "Searching..." : "Find Ride"}
      </button>
    </div>
  );
}
