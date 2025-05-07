import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssistantManageProfile = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from props or context
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
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"]
  });

  const [editing, setEditing] = useState({
    tarif: false,
    slots: false
  });
  const [newSlot, setNewSlot] = useState("");
  const [tempTarif, setTempTarif] = useState({...barber.tarif});

  const handleTarifChange = (service, value) => {
    setTempTarif({
      ...tempTarif,
      [service]: value
    });
  };

  const handleSaveTarif = () => {
    setBarber({
      ...barber,
      tarif: {...tempTarif}
    });
    setEditing({...editing, tarif: false});
    alert("Tariffs updated successfully!");
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

  return (
    <div style={{
      maxWidth: "800px",
      margin: "100px auto 50px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
      backgroundColor: "#fff",
    }}>
      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>Manage Barber Profile</h2>

      <img
        src={barber.profileImage}
        alt={`${barber.name}'s profile`}
        style={{ width: "150px", borderRadius: "50%", margin: "20px 0" }}
      />

      {/* Service Tariffs Section */}
      <div style={{
        marginTop: "40px",
        border: "1px solid #1e90ff",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>💵 Service Tariffs</h3>
          <button 
            onClick={() => setEditing({...editing, tarif: !editing.tarif})}
            style={{
              padding: "5px 15px",
              backgroundColor: editing.tarif ? "#dc3545" : "#6A82FB",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {editing.tarif ? "Cancel" : "Edit"}
          </button>
        </div>

        {editing.tarif ? (
          <div>
            {barber.services.map(service => (
              <div key={service} style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
                <label style={{ width: "100px", fontWeight: "bold" }}>{service}:</label>
                <input
                  type="text"
                  value={tempTarif[service] || ""}
                  onChange={(e) => handleTarifChange(service, e.target.value)}
                  style={{
                    flex: 1,
                    padding: "5px",
                    marginLeft: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                />
              </div>
            ))}
            <button 
              onClick={handleSaveTarif}
              style={{
                marginTop: "10px",
                padding: "8px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Save Tariffs
            </button>
          </div>
        ) : (
          <ul>
            {Object.entries(barber.tarif).map(([service, price]) => (
              <li key={service} style={{ marginBottom: "10px" }}>
                <strong>{service}:</strong> {price}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Time Slots Section */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>📅 Manage Time Slots</h3>
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

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "#6A82FB",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ← Back to Profile
      </button>
    </div>
  );
};

export default AssistantManageProfile;