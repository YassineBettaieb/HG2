import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);

        const barbers = [
          { id: 1, name: "Barber One", lat: coords.lat + 0.001, lng: coords.lng + 0.001, distance: "200m" },
          { id: 2, name: "Barber Two", lat: coords.lat - 0.0015, lng: coords.lng - 0.0012, distance: "350m" },
          { id: 3, name: "Barber Three", lat: coords.lat + 0.0005, lng: coords.lng - 0.001, distance: "500m" },
          { id: 4, name: "Barber Four", lat: coords.lat - 0.001, lng: coords.lng + 0.0015, distance: "650m" },
          { id: 5, name: "Barber Five", lat: coords.lat + 0.002, lng: coords.lng + 0.0005, distance: "800m" },
        ];

        setNearbyBarbers(barbers);
      },
      (error) => {
        console.error("Geolocation error:", error);
        const fallback = { lat: 36.8065, lng: 10.1815 }; // Tunis
        setLocation(fallback);
        setNearbyBarbers([
          { id: 0, name: "Fallback Barber", lat: fallback.lat + 0.001, lng: fallback.lng + 0.001, distance: "300m" },
        ]);
      }
    );
  }, []);

  const handleBarberClick = (barber) => {
    navigate("/PublicBarberProfile", { state: { barber } });
  
    // For backend linking later:
    // navigate(`/barber/${barber.id}`);
  };
  

  const filteredBarbers = search
    ? nearbyBarbers.filter((barber) =>
        barber.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div>
      {/* Navbar */}
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand page-scroll" href="/hpl">
              HajjemGo
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/profile" className="page-scroll">
                <i className="fa fa-user" style={{ fontSize: "20px" }}></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Search bar */}
      <div style={{ paddingTop: "100px", textAlign: "center", position: "relative" }}>
        <input
          type="text"
          placeholder="Search for nearby barbers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "60%",
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />
        {/* Search dropdown */}
        {search && filteredBarbers.length > 0 && (
          <div
            style={{
              position: "absolute",
              left: "20%",
              width: "60%",
              background: "#fff",
              border: "1px solid #ccc",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              zIndex: 1000,
              borderRadius: "0 0 5px 5px",
              maxHeight: "200px",
              overflowY: "auto",
              textAlign: "left",
            }}
          >
            {filteredBarbers.map((barber) => (
              <div
                key={barber.id}
                onClick={() => handleBarberClick(barber.id)}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {barber.name} — <span style={{ color: "gray" }}>{barber.distance}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", height: "500px", borderRadius: "10px", overflow: "hidden" }}>
          {location ? (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.lat, location.lng]}>
                <Popup>You are here</Popup>
              </Marker>
              {nearbyBarbers.map((barber) => (
                <Marker
                  key={barber.id}
                  position={[barber.lat, barber.lng]}
                  eventHandlers={{
                    click: () => handleBarberClick(barber.id),
                  }}
                >
                  <Popup>
                    <strong>{barber.name}</strong> — {barber.distance}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </div>

      {/* Barber list */}
      <div style={{
        marginTop: "40px",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Nearby Barbers</h3>
        {nearbyBarbers.map((barber) => (
          <div
            key={barber.id}
            onClick={() => handleBarberClick(barber.id)}
            style={{
              padding: "10px 15px",
              borderBottom: "1px solid #eee",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            {barber.name} — <span style={{ color: "gray" }}>{barber.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
