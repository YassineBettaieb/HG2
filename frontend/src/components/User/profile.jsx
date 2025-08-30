import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();

  // Create axios instance with base configuration
  const api = axios.create({
    baseURL: "http://localhost:5000/api", // Update with your backend URL
    headers: {
      "Content-Type": "application/json",
    }
  });

  // Fetch user data and reservations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        
        if (!token || !userId) {
          console.error("Missing authentication data");
          navigate("/login");
          return;
        }

        // Add token to headers for this request
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // 1. First fetch user data
        const userResponse = await api.get(`/user/${userId}`);
        if (!userResponse.data) {
          throw new Error("User data not found");
        }
        setUser(userResponse.data);

        // 2. Then fetch user's reservations
        const reservationsResponse = await api.get(`/reservation/user/${userId}`);
        const allReservations = reservationsResponse.data;
        
        // Process reservations
        const now = new Date();
        const upcomingReservations = allReservations
          .filter(res => new Date(res.date) >= now)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        if (upcomingReservations.length > 0) {
          setCurrentReservation(upcomingReservations[0]);
        }
        
        const pastReservations = allReservations
          .filter(res => new Date(res.date) < now)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setReservations(pastReservations);
        
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.response?.data?.message || "Failed to load profile data");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);



  // Countdown timer for current reservation
  useEffect(() => {
    if (currentReservation) {
      const timer = setInterval(() => {
        const now = new Date();
        const reservationTime = new Date(currentReservation.date);
        const diff = reservationTime - now;
        
        if (diff <= 0) {
          clearInterval(timer);
          setTimeLeft("Reservation time has passed");
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [currentReservation]);

  const handleCancelReservation = async () => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await api.delete(`/api/reservation/${currentReservation._id}`);

        setCurrentReservation(null);
        alert("Reservation cancelled successfully");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to cancel reservation");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      case 'pending': return '#FF9800';
      case 'completed': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.5rem'
    }}>
      Loading...
    </div>
  );

  if (error) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'red',
      fontSize: '1.5rem'
    }}>
      Error: {error}
    </div>
  );

  if (!user) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.5rem'
    }}>
      No user data found
    </div>
  );

  return (
    <div>
      {/* Navigation */}
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

      {/* Profile Section */}
      <div id="profile" style={{ paddingTop: "100px", paddingBottom: "50px" }}>
        <div className="container">
          <div className="row" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Left Container */}
            <div
              className="col-xs-12 col-md-4 text-center"
              style={{
                border: "2px solid #6A82FB",
                borderRadius: "12px",
                padding: "30px 15px",
                backgroundColor: "#f9f9f9",
                flex: "1",
                minWidth: "300px"
              }}
            >
              <img
                src={user.profileImage || "/img/user-placeholder.png"}
                alt="Profile"
                className="img-responsive img-circle"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  margin: "0 auto",
                  border: "3px solid #ddd",
                }}
              />
              <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>
                {user.name}
              </h3>
              <p style={{ color: "#555" }}>Client</p>
            </div>

            {/* Right Container */}
            <div
              className="col-xs-12 col-md-7"
              style={{
                border: "2px solid #6A82FB",
                borderRadius: "12px",
                padding: "30px 25px",
                backgroundColor: "#f9f9f9",
                flex: "2",
                minWidth: "300px"
              }}
            >
              <div className="about-text">
                <h2 style={{ fontWeight: "bold" }}>MY PROFILE</h2>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone || "Not provided"}
                </p>
                <p>
                  <strong>Role:</strong> Client
                </p>

                <div style={{ marginTop: "20px" }}>
                  <a
                    href="/ClientEditProfile"
                    className="btn btn-custom btn-lg page-scroll"
                    style={{
                      marginRight: "10px",
                      background: "linear-gradient(to right, #6A82FB, #56CCF2)",
                      border: "none",
                      borderRadius: "20px",
                      color: "#fff",
                      padding: "10px 20px",
                      marginBottom: "10px",
                      textDecoration: "none",
                      display: "inline-block"
                    }}
                  >
                    EDIT PROFILE
                  </a>
                  <button
                    onClick={handleLogout}
                    className="btn btn-custom btn-lg page-scroll"
                    style={{
                      background: "linear-gradient(to right, #6A82FB, #56CCF2)",
                      border: "none",
                      borderRadius: "20px",
                      color: "#fff",
                      padding: "10px 20px",
                      marginBottom: "10px",
                      cursor: "pointer"
                    }}
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Reservation Dashboard */}
          {currentReservation && (
            <div
              style={{
                marginTop: "50px",
                border: "2px solid #6A82FB",
                borderRadius: "12px",
                padding: "30px",
                backgroundColor: "#fdfdfd",
              }}
            >
              <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                Current Reservation
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table className="table" style={{ width: "100%" }}>
                  <thead style={{ backgroundColor: "#6A82FB", color: "white" }}>
                    <tr>
                      <th>Barber</th>
                      <th>Reserved Time</th>
                      <th>Time Left</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{currentReservation.barber?.name || "Unknown Barber"}</td>
                      <td>{new Date(currentReservation.date).toLocaleString()}</td>
                      <td>{timeLeft}</td>
                      <td>
                        <span style={{
                          padding: "5px 10px",
                          borderRadius: "12px",
                          backgroundColor: getStatusColor(currentReservation.status),
                          color: "white",
                          fontWeight: "bold"
                        }}>
                          {currentReservation.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={handleCancelReservation}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                          disabled={currentReservation.status === "cancelled" || currentReservation.status === "completed"}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reservation History */}
          <div
            style={{
              marginTop: "50px",
              border: "2px solid #6A82FB",
              borderRadius: "12px",
              padding: "30px",
              backgroundColor: "#fdfdfd",
            }}
          >
            <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
              Reservation History
            </h2>
            {reservations.length > 0 ? (
              <div style={{ overflowX: "auto" }}>
                <table className="table table-bordered" style={{ width: "100%" }}>
                  <thead style={{ backgroundColor: "#6A82FB", color: "white" }}>
                    <tr>
                      <th>Time</th>
                      <th>Barber</th>
                      <th>Service</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r._id}>
                        <td>{new Date(r.date).toLocaleString()}</td>
                        <td>{r.barber?.name || "Unknown Barber"}</td>
                        <td>{r.service}</td>
                        <td>
                          <span style={{
                            padding: "3px 8px",
                            borderRadius: "12px",
                            backgroundColor: getStatusColor(r.status),
                            color: "white",
                            fontSize: "0.9em",
                            display: "inline-block"
                          }}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontSize: "1.1rem" }}>No past reservations found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};