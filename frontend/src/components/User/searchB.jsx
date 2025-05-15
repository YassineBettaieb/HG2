import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Custom marker icons
const createCustomIcon = (iconColor = 'red') => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const barberIcon = createCustomIcon('red');
const userLocationIcon = createCustomIcon('blue');
const highlightedBarberIcon = createCustomIcon('green');

export const SearchB = () => {
  const [location, setLocation] = useState(null);
  const [nearbyBarbers, setNearbyBarbers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedBarber, setHighlightedBarber] = useState(null);
  const navigate = useNavigate();

  // Configure axios
  axios.defaults.baseURL = "http://localhost:5000";

  const fetchNearbyBarbers = async (lat, lng) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/barber/nearby', {
        params: {
          latitude: lat,
          longitude: lng,
          radius: 5000 // 5km radius
        }
      });

      const barbersWithLocation = response.data
        .filter(barber => barber.geoLocation?.coordinates)
        .map(barber => ({
          ...barber,
          id: barber._id,
          lat: barber.geoLocation.coordinates[1],
          lng: barber.geoLocation.coordinates[0],
          distance: calculateDistance(lat, lng, barber.geoLocation.coordinates[1], barber.geoLocation.coordinates[0])
        }))
        .sort((a, b) => a.distance - b.distance);

      setNearbyBarbers(barbersWithLocation);
    } catch (err) {
      console.error("Error fetching barbers:", err);
      setError("Failed to load barbers. Please try again later.");
      setNearbyBarbers([
        { 
          id: "1", 
          name: "Sample Barber", 
          lat: 36.8065, 
          lng: 10.1815,
          distance: 500,
          services: ["Haircut", "Shave"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return Math.round(R * c);
  };

  const formatDistance = (meters) => {
    return meters < 1000 ? `${meters}m` : `${(meters/1000).toFixed(1)}km`;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);
        fetchNearbyBarbers(coords.lat, coords.lng);
      },
      (error) => {
        console.error("Geolocation error:", error);
        const fallback = { lat: 36.8065, lng: 10.1815 }; // Tunis
        setLocation(fallback);
        fetchNearbyBarbers(fallback.lat, fallback.lng);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleBarberClick = (barberId) => {
    navigate(`/barber/${barberId}`);
  };

  const handleBarberHover = (barberId, isHovering) => {
    setHighlightedBarber(isHovering ? barberId : null);
  };

  const filteredBarbers = search
    ? nearbyBarbers.filter(barber =>
        barber.name.toLowerCase().includes(search.toLowerCase())
      )
    : nearbyBarbers;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
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
                onMouseEnter={() => handleBarberHover(barber.id, true)}
                onMouseLeave={() => handleBarberHover(barber.id, false)}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  backgroundColor: highlightedBarber === barber.id ? "#f0f0f0" : "transparent",
                  transition: "background-color 0.2s ease"
                }}
              >
                {barber.name} — <span style={{ color: "gray" }}>{formatDistance(barber.distance)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", height: "500px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}>
          {loading ? (
            <div style={{ 
              height: "100%", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              backgroundColor: "#f9f9f9"
            }}>
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div style={{ 
              height: "100%", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              color: "red",
              backgroundColor: "#f9f9f9",
              flexDirection: "column"
            }}>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Try Again
              </button>
            </div>
          ) : location ? (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
              doubleClickZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* User Location Marker */}
              <Marker 
                position={[location.lat, location.lng]}
                icon={userLocationIcon}
              >
                <Popup>Your Location</Popup>
              </Marker>

              {/* Barber Markers */}
              {filteredBarbers.map((barber) => (
                <Marker
                  key={barber.id}
                  position={[barber.lat, barber.lng]}
                  icon={highlightedBarber === barber.id ? highlightedBarberIcon : barberIcon}
                  eventHandlers={{
                    click: () => handleBarberClick(barber.id),
                    mouseover: () => handleBarberHover(barber.id, true),
                    mouseout: () => handleBarberHover(barber.id, false)
                  }}
                >
                  <Popup>
                    <div style={{ textAlign: 'center', minWidth: '200px' }}>
                      <h4 style={{ margin: '5px 0', color: '#333' }}>{barber.name}</h4>
                      <p style={{ margin: '5px 0', color: '#555' }}>
                        <strong>Distance:</strong> {formatDistance(barber.distance)}
                      </p>
                      {barber.services && (
                        <div style={{ margin: '5px 0' }}>
                          <p style={{ margin: '3px 0', color: '#555' }}>
                            <strong>Services:</strong> {barber.services.slice(0, 3).join(', ')}
                            {barber.services.length > 3 ? '...' : ''}
                          </p>
                        </div>
                      )}
                      <button 
                        onClick={() => handleBarberClick(barber.id)}
                        style={{
                          marginTop: '8px',
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          width: '100%'
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div style={{ 
              height: "100%", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              backgroundColor: "#f9f9f9"
            }}>
              <p>Loading map...</p>
            </div>
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
        <h3 style={{ 
          textAlign: "center", 
          marginBottom: "20px",
          color: "#333"
        }}>
          {location ? "Nearby Barbers" : "All Barbers"}
        </h3>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : filteredBarbers.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No barbers found nearby</p>
        ) : (
          filteredBarbers.map((barber) => (
            <div
              key={barber.id}
              onClick={() => handleBarberClick(barber.id)}
              onMouseEnter={() => handleBarberHover(barber.id, true)}
              onMouseLeave={() => handleBarberHover(barber.id, false)}
              style={{
                padding: "12px 15px",
                borderBottom: "1px solid #eee",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: highlightedBarber === barber.id ? "#f0f0f0" : "transparent",
                transition: "background-color 0.2s ease",
                borderRadius: "4px"
              }}
            >
              <div style={{ flex: 1 }}>
                <strong style={{ color: "#333" }}>{barber.name}</strong>
                {barber.services && (
                  <span style={{ 
                    marginLeft: "10px", 
                    color: "#666", 
                    fontSize: "14px",
                    display: "block",
                    marginTop: "3px"
                  }}>
                    {barber.services.slice(0, 2).join(", ")}{barber.services.length > 2 ? "..." : ""}
                  </span>
                )}
              </div>
              <span style={{ 
                color: "gray",
                backgroundColor: "#e9ecef",
                padding: "3px 8px",
                borderRadius: "10px",
                fontSize: "14px"
              }}>
                {formatDistance(barber.distance)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};