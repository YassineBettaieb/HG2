import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Correction des icônes Leaflet pour qu'elles s'affichent correctement
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export const SearchB = () => {
  const [location, setLocation] = useState(null);
  const [nearbyBarbers, setNearbyBarbers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);

        // Dummy nearby barbers (with coords around current location)
        const barbers = [
          { name: "Barber One", lat: coords.lat + 0.001, lng: coords.lng + 0.001, distance: "200m" },
          { name: "Barber Two", lat: coords.lat - 0.0015, lng: coords.lng - 0.0012, distance: "350m" },
          { name: "Barber Three", lat: coords.lat + 0.0005, lng: coords.lng - 0.001, distance: "500m" },
          { name: "Barber Four", lat: coords.lat - 0.001, lng: coords.lng + 0.0015, distance: "650m" },
          { name: "Barber Five", lat: coords.lat + 0.002, lng: coords.lng + 0.0005, distance: "800m" },
        ];

        setNearbyBarbers(barbers);
      },
      (error) => {
        console.error("Geolocation error:", error);
        const fallback = { lat: 36.8065, lng: 10.1815 }; // Tunis
        setLocation(fallback);
        setNearbyBarbers([
          { name: "Fallback Barber", lat: fallback.lat + 0.001, lng: fallback.lng + 0.001, distance: "300m" },
        ]);
      }
    );
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand page-scroll" href="/hpl">
              HajjemGo
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/profile" className="page-scroll">
                  <i className="fa fa-user" style={{ fontSize: "20px" }}></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search bar */}
      <div style={{ paddingTop: "100px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search for nearby barbers..."
          style={{
            width: "60%",
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Map */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "90%", height: "500px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          {location ? (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.lat, location.lng]}>
                <Popup>You are here</Popup>
              </Marker>
              {nearbyBarbers.map((barber, index) => (
                <Marker key={index} position={[barber.lat, barber.lng]}>
                  <Popup>
                    {barber.name} — {barber.distance}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <p style={{ textAlign: "center" }}>Loading map...</p>
          )}
        </div>
      </div>

      {/* Barber list */}
      <div
        style={{
          marginTop: "40px",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Nearby Barbers
        </h3>
        {nearbyBarbers.map((barber, index) => (
          <div
            key={index}
            style={{
              padding: "10px 15px",
              borderBottom: "1px solid #eee",
              fontSize: "16px",
            }}
          >
            {barber.name} —{" "}
            <span style={{ color: "gray" }}>{barber.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
