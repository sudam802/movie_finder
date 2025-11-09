import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fixLeafletIcons";
import RideSummary from "./RideSummary";

export default function RideMap({ pickup, destination, coordinates }) {
  const [route, setRoute] = useState(null);
  const [summary, setSummary] = useState(null); // ✅ distance, duration

  useEffect(() => {
    async function fetchRoute() {
      if (coordinates?.pickup && coordinates?.destination) {
        const { pickup, destination } = coordinates;
        const routeUrl = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

        try {
          const res = await fetch(routeUrl);
          const data = await res.json();

          if (data.code === "Ok" && data.routes.length > 0) {
            const routeData = data.routes[0];
            const routeCoords = routeData.geometry.coordinates.map((coord) => [coord[1], coord[0]]);
            setRoute(routeCoords);

            // ✅ Save distance and duration
            setSummary({
              distance: (routeData.distance / 1000).toFixed(2), // km
              duration: (routeData.duration / 3600).toFixed(2), // hours
            });
          } else {
            alert("No driving route found between those locations.");
            setRoute(null);
            setSummary(null);
          }
        } catch (err) {
          console.error("Error fetching route:", err);
          alert("Could not fetch route. Please try closer locations.");
        }
      }
    }

    fetchRoute();
  }, [coordinates]);

  if (!coordinates) {
    return <div className="map-placeholder">Enter pickup and destination to view route</div>;
  }

  const { pickup: pickupCoords, destination: destCoords } = coordinates;

  return (
    <div className="ride-map-container">
      <MapContainer
        center={[pickupCoords.lat, pickupCoords.lng]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={[pickupCoords.lat, pickupCoords.lng]}>
          <Popup>Pickup: {pickup}</Popup>
        </Marker>
        {destCoords && (
          <Marker position={[destCoords.lat, destCoords.lng]}>
            <Popup>Destination: {destination}</Popup>
          </Marker>
        )}
        {route && <Polyline positions={route} color="blue" weight={4} />}
      </MapContainer>

      {/* ✅ Display summary info below map */}
      {summary && <RideSummary summary={summary} pickup={pickup} destination={destination} />}
    </div>
  );
}
