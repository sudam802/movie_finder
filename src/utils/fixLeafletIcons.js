import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Remove the default method so we can redefine icon URLs
delete L.Icon.Default.prototype._getIconUrl;

// Merge the default options with correct URLs
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
