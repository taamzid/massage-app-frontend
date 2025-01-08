import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom Zoom Control Component
const CustomZoomControls = () => {
  const map = useMap();

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-full"
    >
      <button
        onClick={() => map.zoomIn()}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
          padding: "4px 12px 0 12px"
        }}
      >
        +
      </button>
      <hr />
      <button
        onClick={() => map.zoomOut()}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
          padding: "4px 12px 0 12px"
        }}
      >
        −
      </button>
    </div>
  );
};

const Map = () => {
  return (
    <div style={{ height: "300px", width: "100%", position: "relative", margin: "16px auto", borderRadius: "10px", zIndex: 0 }}>
      <MapContainer
        center={[26.3587, -80.0831]} // Boca Raton coordinates
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} // Disable default zoom control
        attributionControl={false} // Remove attribution
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[26.3587, -80.0831]}>
          <Popup>Boca Raton</Popup>
        </Marker>
        {/* Add Custom Zoom Controls */}
        <CustomZoomControls />
      </MapContainer>
    </div>
  );
};

export default Map;
