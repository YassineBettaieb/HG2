import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssistantManageProfile = () => {
  const navigate = useNavigate();
  
  // Mock data combining barber profile and appointments
  const [barber, setBarber] = useState({
    name: "Mohamed Hajjem",
    profileImage: "/img/dummyB.png",
    location: "Tunis, Tunisia",
    services: ["Haircut", "Beard Trim", "Facial"],
    bio: "Experienced barber with 10+ years of styling and grooming.",
    tarif: {
      Haircut: "50 TND",
      "Beard Trim": "30 TND",
      Facial: "70 TND",
    },
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    assistants: ["Ali Messaoud", "Karim Bacha"]
  });

  // Appointments data from ProfileB
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

  // Service data from ProfileB
  const [serviceData, setServiceData] = useState([
    { service: "Haircut", price: 20 },
    { service: "Beard Trim", price: 15 },
    { service: "Shaving", price: 10 },
  ]);

  // Schedule data from ProfileB
  const [schedule, setSchedule] = useState([
    { day: "Monday", start: "09:00", end: "17:00" },
    { day: "Tuesday", start: "09:00", end: "17:00" },
    { day: "Wednesday", start: "09:00", end: "17:00" },
    { day: "Thursday", start: "09:00", end: "17:00" },
    { day: "Friday", start: "09:00", end: "17:00" },
    { day: "Saturday", start: "10:00", end: "15:00" },
    { day: "Sunday", start: "", end: "" },
  ]);

  // State for editing modes
  const [editing, setEditing] = useState({
    tarif: false,
    slots: false,
    services: false,
    schedule: false
  });

  const [newSlot, setNewSlot] = useState("");

  // Functions from ProfileB
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

  const updateSchedule = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };
  
  const handleScheduleSave = () => {
    alert("Schedule saved successfully!");
  };

  const handleDecision = (id, decision) => {
    setAppointments(prev =>
      prev.map(appt =>
        appt.id === id ? { ...appt, status: decision } : appt
      )
    );
  };

  // Assistant-specific functions
  const handleTarifChange = (service, value) => {
    setBarber({
      ...barber,
      tarif: {
        ...barber.tarif,
        [service]: value
      }
    });
  };

  const handleAddSlot = () => {
    if (newSlot && !barber.availableSlots.includes(newSlot)) {
      setBarber({
        ...barber,
        availableSlots: [...barber.availableSlots, newSlot].sort()
      });
      setNewSlot("");
    }
  };

  const handleRemoveSlot = (slot) => {
    setBarber({
      ...barber,
      availableSlots: barber.availableSlots.filter(s => s !== slot)
    });
  };

  // Styles from ProfileB
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

  const inputStyle = {
    width: "90%",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", paddingTop: "100px", paddingBottom: "50px" }}>
      {/* Navigation */}
      <nav style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 20px",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <a href="/as" style={{ color: "#fff", fontWeight: "bold", fontSize: "20px", textDecoration: "none" }}>
            HajjemGo Assistant
          </a>
          <a href="/profileAs" style={{ color: "#fff" }}>
            <i className="fa fa-user" style={{ fontSize: "20px" }}></i>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}>
          {/* Left Panel - Barber Info */}
          <div style={{
            flex: "1 1 300px",
            border: "2px solid #6A82FB",
            borderRadius: "12px",
            padding: "30px 15px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
          }}>
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
            <p style={{ color: "#555" }}>Barber Shop</p>
            <p style={{ color: "#888" }}>{barber.location}</p>
            
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: "linear-gradient(to right, #6A82FB, #56CCF2)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>

          {/* Right Panel - Management Sections */}
          <div style={{
            flex: "2 1 500px",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            {/* Services & Pricing */}
            <div style={{
              border: "2px solid #6A82FB",
              borderRadius: "12px",
              padding: "25px",
              backgroundColor: "#f9f9f9",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>Services & Pricing</h3>
                <button 
                  onClick={() => setEditing({...editing, services: !editing.services})}
                  style={{
                    padding: "5px 15px",
                    backgroundColor: editing.services ? "#dc3545" : "#6A82FB",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {editing.services ? "Cancel" : "Edit"}
                </button>
              </div>

              {editing.services ? (
                <div>
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
                              onChange={(e) => updateService(index, "service", e.target.value)}
                              style={inputStyle}
                            />
                          </td>
                          <td style={tdStyle}>
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => updateService(index, "price", e.target.value)}
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
              ) : (
                <ul>
                  {serviceData.map((item, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                      <strong>{item.service}:</strong> {item.price} TND
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Appointments Dashboard */}
            <div style={{
              border: "2px solid #6A82FB",
              borderRadius: "12px",
              padding: "25px",
              backgroundColor: "#f9f9f9",
            }}>
              <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>Appointments Dashboard</h3>
              <div style={{
                overflowX: "auto",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                      <th style={thStyle}>Client</th>
                      <th style={thStyle}>Time</th>
                      <th style={thStyle}>Services</th>
                      <th style={thStyle}>Requested</th>
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
                            <span style={{ 
                              fontWeight: "bold", 
                              color: appt.status === "accepted" ? "green" : "red" 
                            }}>
                              {appt.status.toUpperCase()}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Working Hours Schedule */}
            <div style={{
              border: "2px solid #6A82FB",
              borderRadius: "12px",
              padding: "25px",
              backgroundColor: "#f9f9f9",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>Working Hours</h3>
                <button 
                  onClick={() => setEditing({...editing, schedule: !editing.schedule})}
                  style={{
                    padding: "5px 15px",
                    backgroundColor: editing.schedule ? "#dc3545" : "#6A82FB",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {editing.schedule ? "Cancel" : "Edit"}
                </button>
              </div>

              {editing.schedule ? (
                <div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th style={thStyle}>Day</th>
                        <th style={thStyle}>Start</th>
                        <th style={thStyle}>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((day, index) => (
                        <tr key={day.day}>
                          <td style={tdStyle}>{day.day}</td>
                          <td style={tdStyle}>
                            <input
                              type="time"
                              value={day.start}
                              onChange={(e) => updateSchedule(index, "start", e.target.value)}
                              style={inputStyle}
                            />
                          </td>
                          <td style={tdStyle}>
                            <input
                              type="time"
                              value={day.end}
                              onChange={(e) => updateSchedule(index, "end", e.target.value)}
                              style={inputStyle}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={handleScheduleSave}
                    style={{
                      marginTop: "15px",
                      padding: "8px 20px",
                      background: "linear-gradient(to right, #6A82FB, #56CCF2)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Save Schedule
                  </button>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                      <th style={thStyle}>Day</th>
                      <th style={thStyle}>Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((day) => (
                      <tr key={day.day}>
                        <td style={tdStyle}>{day.day}</td>
                        <td style={tdStyle}>
                          {day.start && day.end ? `${day.start} - ${day.end}` : "Closed"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Time Slots Section */}
            <div style={{
              border: "2px solid #6A82FB",
              borderRadius: "12px",
              padding: "25px",
              backgroundColor: "#f9f9f9",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>Time Slots</h3>
                <button 
                  onClick={() => setEditing({...editing, slots: !editing.slots})}
                  style={{
                    padding: "5px 15px",
                    backgroundColor: editing.slots ? "#dc3545" : "#6A82FB",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {editing.slots ? "Cancel" : "Edit"}
                </button>
              </div>

              {editing.slots && (
                <div style={{ marginBottom: "20px", display: "flex" }}>
                  <input
                    type="time"
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      marginRight: "10px"
                    }}
                  />
                  <button
                    onClick={handleAddSlot}
                    style={{
                      padding: "8px 15px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Add Slot
                  </button>
                </div>
              )}

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "10px",
              }}>
                {barber.availableSlots.map((slot) => (
                  <div
                    key={slot}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      backgroundColor: "#d4edda",
                      color: "#155724",
                      position: "relative",
                      textAlign: "center"
                    }}
                  >
                    {slot}
                    {editing.slots && (
                      <button
                        onClick={() => handleRemoveSlot(slot)}
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        ×
                      </button>
                    )}
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

export default AssistantManageProfile;