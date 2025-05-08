import React, { useState, useEffect } from "react";

export const Profile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+216 55 123 456",
    role: "Client",
    profilePicture: "img/user-placeholder.png",
  };

  const [currentReservation, setCurrentReservation] = useState({
    id: 4,
    time: "2025-05-10 14:00",
    barberName: "Mohamed Hajjem",
    price: "35 TND",
    status: "accepted", // can be 'accepted', 'refused', or 'onhold'
  });

  const reservations = [
    {
      id: 1,
      time: "2025-05-04 14:00",
      barberName: "Ali Hajjem",
      price: "25 TND",
    },
    {
      id: 2,
      time: "2025-04-28 16:30",
      barberName: "Karim Ben Said",
      price: "30 TND",
    },
    {
      id: 3,
      time: "2025-04-15 11:00",
      barberName: "Mehdi Trabelsi",
      price: "20 TND",
    },
  ];

  // Countdown timer for current reservation
  const [timeLeft, setTimeLeft] = useState("");
  
  useEffect(() => {
    if (currentReservation) {
      const timer = setInterval(() => {
        const now = new Date();
        const reservationTime = new Date(currentReservation.time);
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

  const handleCancelReservation = () => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      setCurrentReservation(null);
      alert("Reservation cancelled successfully");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'green';
      case 'refused': return 'red';
      case 'onhold': return 'orange';
      default: return 'gray';
    }
  };

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
          <div className="row" style={{ display: "flex", gap: "20px" }}>
            {/* Left Container */}
            <div
              className="col-xs-12 col-md-4 text-center"
              style={{
                border: "2px solid #6A82FB",
                borderRadius: "12px",
                padding: "30px 15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src="/img/CS2.2.jpg"
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
              <p style={{ color: "#555" }}>{user.role}</p>
            </div>

            {/* Right Container */}
            <div
              className="col-xs-12 col-md-7"
              style={{
                border: "2px solid #6A82FB",
                borderRadius: "12px",
                padding: "30px 25px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div className="about-text">
                <h2 style={{ fontWeight: "bold" }}>MY PROFILE</h2>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>

                <div style={{ marginTop: "20px" }}>
                  <a
                    href="/ClientEditProfile"
                    className="btn btn-custom btn-lg page-scroll"
                    style={{
                      marginRight: "10px",
                      background:
                        "linear-gradient(to right, #6A82FB, #56CCF2)",
                      border: "none",
                      borderRadius: "20px",
                      color: "#fff",
                      padding: "10px 20px",
                      marginBottom: "10px",
                    }}
                  >
                    EDIT PROFILE
                  </a>
                  <a
                    href="/"
                    className="btn btn-custom btn-lg page-scroll"
                    style={{
                      background: "linear-gradient(to right, #6A82FB, #56CCF2)",
                      border: "none",
                      borderRadius: "20px",
                      color: "#fff",
                      padding: "10px 20px",
                      marginBottom: "10px",
                    }}
                  >
                    LOGOUT
                  </a>
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
                      <td>{currentReservation.barberName}</td>
                      <td>{currentReservation.time}</td>
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
            <table className="table table-bordered">
              <thead style={{ backgroundColor: "#6A82FB", color: "white" }}>
                <tr>
                  <th>Time</th>
                  <th>Barber</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td>{r.time}</td>
                    <td>{r.barberName}</td>
                    <td>{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};