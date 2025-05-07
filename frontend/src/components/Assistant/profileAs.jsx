import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProfileAs = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [stats, setStats] = useState({ today: 0, completed: 0 });
  const [assistant, setAssistant] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  

  // Fetch assistant data on component mount
  useEffect(() => {
    const fetchAssistantData = async () => {
      try {
        setLoading(true);
        const [profileRes, statsRes] = await Promise.all([
          axios.get("/api/assistants/me"),
          axios.get("/api/assistants/me/stats")
        ]);
        
        setAssistant(profileRes.data);
        setIsOnline(profileRes.data.isOnline);
        setStats(statsRes.data);
      } catch (error) {
        toast.error("Failed to load profile data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssistantData();
  }, []);

  // Handle online status toggle
  const toggleStatus = async () => {
    const newStatus = !isOnline;
    try {
      await axios.patch("/api/assistants/me/status", { isOnline: newStatus });
      setIsOnline(newStatus);
      toast.success(`You're now ${newStatus ? "online" : "offline"}`);
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Status update error:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Quick actions configuration
  const quickActions = [
    {
      title: "Add Slot",
      icon: "➕",
      action: () => navigate("/AssistantManageProfile"),
      color: "#E0F7FA",
      textColor: "#00796B"
    },
    {
      title: "Upcoming",
      icon: "📅",
      action: () => navigate("/ManageBarberProfile"),
      color: "#FFF3E0",
      textColor: "#E65100"
    },
    {
      title: "Edit Services",
      icon: "✂️",
      action: () => navigate("/ManageBarberProfile"),
      color: "#E8F5E9",
      textColor: "#2E7D32"
    }
  ];

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
            <a className="navbar-brand page-scroll" href="/as">
              HajjemGo
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/profileAs" className="page-scroll">
                  <i className="fa fa-user" style={{ fontSize: "20px" }}></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div id="profile" style={{ paddingTop: "100px", paddingBottom: "50px" }}>
        <div className="container">
          <div className="row" style={{ display: "flex", gap: "20px" }}>
            {/* Left Panel */}
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
                src={assistant?.profilePicture || "img/user-placeholder.png"}
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
                {assistant?.name || "Loading..."}
              </h3>
              <p style={{ color: "#777", fontStyle: "italic" }}>
                Barber Assistant for <strong>{assistant?.barber?.name || "Barber Shop"}</strong>
              </p>

              {/* Status Toggle */}
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={toggleStatus}
                  className="btn"
                  style={{
                    background: isOnline
                      ? "linear-gradient(to right, #56CCF2, #2F80ED)"
                      : "linear-gradient(to right, #bbb, #999)",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  disabled={loading}
                >
                  {isOnline ? "🟢 Online" : "⚪ Offline"}
                </button>
              </div>

              {/* Edit Profile Button */}
              <a
                href="/AssistantEditProfile"
                className="btn btn-custom btn-block"
                style={{
                  background: "linear-gradient(to right, #6A82FB, #56CCF2)",
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  marginTop: "10px",
                  display: "inline-block",
                  textDecoration: "none"
                }}
              >
                ✏️ Edit Profile
              </a>
            </div>

            {/* Right Panel */}
            <div
              className="col-xs-12 col-md-7"
              style={{
                border: "2px solid #6A82FB",
                borderRadius: "12px",
                padding: "30px 25px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* Stats */}
              <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                Dashboard
              </h2>
              <div className="row">
                <div className="col-xs-6">
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      padding: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <h4 style={{ fontWeight: "bold" }}>Today's Appointments</h4>
                    <p style={{ fontSize: "24px", color: "#333" }}>
                      {stats.today}
                    </p>
                  </div>
                </div>
                <div className="col-xs-6">
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      padding: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <h4 style={{ fontWeight: "bold" }}>Completed</h4>
                    <p style={{ fontSize: "24px", color: "#333" }}>
                      {stats.completed}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <h4 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                Quick Actions
              </h4>
              <div className="row">
                {quickActions.map((action, index) => (
                  <div key={index} className="col-xs-12 col-sm-4">
                    <button
                      onClick={action.action}
                      style={{
                        width: "100%",
                        display: "block",
                        backgroundColor: action.color,
                        borderRadius: "12px",
                        padding: "20px",
                        textAlign: "center",
                        textDecoration: "none",
                        color: action.textColor,
                        fontWeight: "bold",
                        marginBottom: "20px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        border: "none",
                        cursor: "pointer",
                        transition: "transform 0.2s ease"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      {action.icon}<br />{action.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};