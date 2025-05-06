import React, { useState } from "react";

export const ProfileB = () => {
  const barber = {
    name: "John Doe",
    email: "johndoe@barbers.com",
    phone: "+216 55 123 456",
    role: "Barber",
    profileImage: "img/barber-placeholder.png",
    location: "Tunis, Tunisia",
    geoLocation: {
      type: "Point",
      coordinates: [10.1658, 36.81897],
    },
    services: ["Haircut", "Beard Trim", "Shaving"],
    assistants: ["Ali Messaoud", "Karim Bacha"],
  };

  const [serviceData, setServiceData] = useState([
    { service: "Haircut", price: 20 },
    { service: "Beard Trim", price: 15 },
    { service: "Shaving", price: 10 },
  ]);
  
  const updateService = (index, field, value) => {
    const updated = [...serviceData];
    updated[index][field] = value;
    setServiceData(updated);
  };
  
  const addService = () => {
    setServiceData([...serviceData, { service: "", price: 0 }]);
  };
  
  const removeService = (index) => {
    setServiceData(serviceData.filter((_, i) => i !== index));
  };
  

  const [schedule, setSchedule] = useState([
    { day: "Monday", start: "", end: "" },
    { day: "Tuesday", start: "", end: "" },
    { day: "Wednesday", start: "", end: "" },
    { day: "Thursday", start: "", end: "" },
    { day: "Friday", start: "", end: "" },
    { day: "Saturday", start: "", end: "" },
    { day: "Sunday", start: "", end: "" },
  ]);
  
  const updateSchedule = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };
  
  const handleScheduleSave = () => {
    console.log("Saved Schedule:", schedule); // Replace with API call
    alert("Schedule saved successfully!");
  };
  

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: "Ahmed Ben Ali",
      time: "2025-05-05 14:00",
      services: ["Haircut", "Beard Trim"],
      requestedAt: "2025-05-04 10:22",
      status: "pending",
    },
    {
      id: 2,
      clientName: "Sami Kallel",
      time: "2025-05-05 16:00",
      services: ["Shaving"],
      requestedAt: "2025-05-04 12:10",
      status: "pending",
    },
  ]);

  const handleDecision = (id, decision) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: decision } : appt
      )
    );
  };
  const inputStyle = {
    width: "90%",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };
  

  return (
    <div style={{ fontFamily: "Arial, sans-serif", paddingBottom: "50px" }}>
      {/* Navigation */}
      <nav
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px 20px",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href="/bb" style={{ color: "#fff", fontWeight: "bold", fontSize: "20px", textDecoration: "none" }}>
            HajjemGo
          </a>
          <a href="/profile" style={{ color: "#fff" }}>
            <i className="fa fa-scissors" style={{ fontSize: "20px" }}></i>
          </a>
        </div>
      </nav>

      {/* Profile Section */}
      <div style={{ paddingTop: "100px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          {/* Left Container */}
          <div
            style={{
              flex: "1 1 300px",
              border: "2px solid rgb(34, 255, 0)",
              borderRadius: "12px",
              padding: "30px 15px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
            <img
              src={barber.profileImage}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "3px solid #ddd",
                marginBottom: "20px",
              }}
            />
            <h3 style={{ fontWeight: "bold" }}>{barber.name}</h3>
            <p style={{ color: "#555" }}>{barber.role}</p>
            <p style={{ color: "#888" }}>{barber.location}</p>
          </div>

          {/* Right Container */}
          <div
            style={{
              flex: "2 1 500px",
              border: "2px solid rgb(34, 255, 0)",
              borderRadius: "12px",
              padding: "30px 25px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>BARBER PROFILE</h2>
            <p><strong>Email:</strong> {barber.email}</p>
            <p><strong>Phone:</strong> {barber.phone}</p>
            <p><strong>Location:</strong> {barber.location}</p>
            <p><strong>Coordinates:</strong> {barber.geoLocation.coordinates.join(", ")}</p>
            <p><strong>Services:</strong> {barber.services.join(", ")}</p>
            <p><strong>Assistants:</strong> {barber.assistants.join(", ")}</p>

            <div style={{ marginTop: "20px" }}>
              <a
                href="/BarberEditProfile"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(to right, #6A82FB, #56CCF2)",
                  border: "none",
                  borderRadius: "20px",
                  color: "#fff",
                  padding: "10px 20px",
                  marginRight: "10px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                EDIT PROFILE
              </a>
              <a
                href="/"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(to right, #6A82FB, #56CCF2)",
                  border: "none",
                  borderRadius: "20px",
                  color: "#fff",
                  padding: "10px 20px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                LOGOUT
              </a>
            </div>
          </div>
        </div>

{/* Services & Prices Table */}
<div
  style={{
    marginTop: "40px",
    border: "2px solid rgb(34, 255, 0)",
    borderRadius: "12px",
    padding: "25px",
    backgroundColor: "#f9f9f9",
  }}
>
  <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>
    Services & Pricing Dashboard
  </h3>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ backgroundColor: "#e0ffe0" }}>
        <th style={thStyle}>Service</th>
        <th style={thStyle}>Price (TND)</th>
        <th style={thStyle}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {serviceData.map((item, index) => (
        <tr key={index}>
          <td style={tdStyle}>
            <input
              type="text"
              value={item.service}
              onChange={(e) =>
                updateService(index, "service", e.target.value)
              }
              style={inputStyle}
            />
          </td>
          <td style={tdStyle}>
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                updateService(index, "price", e.target.value)
              }
              style={inputStyle}
            />
          </td>
          <td style={tdStyle}>
            <button
              onClick={() => removeService(index)}
              style={btnDanger}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button
    onClick={addService}
    style={{ ...btnSuccess, marginTop: "15px" }}
  >
    + Add New Service
  </button>
</div>


        {/* Appointments Section */}
        <div style={{ marginTop: "50px", padding: "0 10px" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>Appointments Dashboard</h3>
          <div
            style={{
              overflowX: "auto",
              border: "2px solid #ccc",
              borderRadius: "12px",
              backgroundColor: "#fff",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f2f2f2" }}>
                <tr>
                  <th style={thStyle}>Client Name</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Services</th>
                  <th style={thStyle}>Requested At</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td style={tdStyle}>{appt.clientName}</td>
                    <td style={tdStyle}>{appt.time}</td>
                    <td style={tdStyle}>{appt.services.join(", ")}</td>
                    <td style={tdStyle}>{appt.requestedAt}</td>
                    <td style={tdStyle}>
                      {appt.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleDecision(appt.id, "accepted")}
                            style={btnSuccess}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecision(appt.id, "refused")}
                            style={btnDanger}
                          >
                            Refuse
                          </button>
                        </>
                      ) : (
                        <span style={{ fontWeight: "bold", color: appt.status === "accepted" ? "green" : "red" }}>
                          {appt.status.toUpperCase()}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Schedule Working Hours Section */}
<div className="row" style={{ marginTop: "50px" }}>
  <div className="col-md-12">
    <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>
      Working Hours Schedule
    </h3>
    <div
      style={{
        overflowX: "auto",
        border: "2px solid #ccc",
        borderRadius: "12px",
        backgroundColor: "#fff",
        padding: "20px",
      }}
    >
      <table className="table table-bordered table-hover">
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={item.day}>
              <td>{item.day}</td>
              <td>
                <input
                  type="time"
                  value={item.start}
                  onChange={(e) =>
                    updateSchedule(index, "start", e.target.value)
                  }
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="time"
                  value={item.end}
                  onChange={(e) =>
                    updateSchedule(index, "end", e.target.value)
                  }
                  className="form-control"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleScheduleSave}
        className="btn btn-primary"
        style={{
          background: "linear-gradient(to right, #6A82FB, #56CCF2)",
          border: "none",
          borderRadius: "20px",
          padding: "10px 20px",
          color: "#fff",
          marginTop: "10px",
        }}
      >
        Save Schedule
      </button>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

// Reusable styles
const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const btnSuccess = {
  backgroundColor: "green",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "6px 10px",
  marginRight: "8px",
  cursor: "pointer",
};

const btnDanger = {
  backgroundColor: "red",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "6px 10px",
  cursor: "pointer",
};
