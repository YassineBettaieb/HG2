import React, { useState } from "react";

// Inline NavigationU component
const NavigationU = () => {
  return (
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
  );
};

const PublicBarberProfile = () => {
  const barber = {
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
  };

  const bookedSlots = ["10:00", "11:30", "14:00"];
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvc: "" });

  const generateTimeSlots = () => {
    const slots = [];
    const start = 9 * 60;
    const end = 18 * 60;
    for (let mins = start; mins < end; mins += 30) {
      const hours = Math.floor(mins / 60).toString().padStart(2, "0");
      const minutes = (mins % 60).toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);
    }
    return slots;
  };

  const handleSlotClick = (slot) => {
    if (!bookedSlots.includes(slot)) {
      setSelectedSlot(slot);
      setShowServiceModal(true);
    }
  };

  const handleServiceConfirm = () => {
    if (selectedService) {
      setShowServiceModal(false);
      setShowPaymentModal(true);
    }
  };

  const handleCancel = () => {
    setShowServiceModal(false);
    setShowPaymentModal(false);
    setSelectedSlot(null);
    setSelectedService("");
    setPaymentMethod("");
    setCardInfo({ number: "", expiry: "", cvc: "" });
  };

  const handleReservationConfirm = () => {
    alert(
      `✅ Reservation confirmed:\n• Service: ${selectedService}\n• Time: ${selectedSlot}\n• Payment: ${paymentMethod}`
    );
    handleCancel();
  };

  return (
    <>
      <NavigationU />
      <div
        style={{
          maxWidth: "800px",
          margin: "120px auto 50px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>{barber.name}</h2>

        {barber.profileImage && (
          <img
            src={barber.profileImage}
            alt={`${barber.name}'s profile`}
            style={{ width: "150px", borderRadius: "50%", margin: "20px 0" }}
          />
        )}

        <p>
          <strong>📍 Location:</strong> {barber.location}
        </p>
        <p>
          <strong>💈 Services:</strong> {barber.services.join(", ")}
        </p>
        <p>
          <strong>👤 About:</strong> {barber.bio}
        </p>

        <div
          style={{
            marginTop: "40px",
            border: "1px solid #1e90ff",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>
            💵 Service Tariffs
          </h3>
          <ul>
            {Object.entries(barber.tarif).map(([service, price]) => (
              <li key={service} style={{ marginBottom: "10px" }}>
                <strong>{service}:</strong> {price}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "40px" }}>
          <h3 style={{ fontSize: "22px", marginBottom: "20px" }}>
            📅 Book a Time Slot
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "10px",
            }}
          >
            {generateTimeSlots().map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotClick(slot)}
                disabled={bookedSlots.includes(slot)}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: bookedSlots.includes(slot)
                    ? "#f8d7da"
                    : selectedSlot === slot
                    ? "#cce5ff"
                    : "#d4edda",
                  color: bookedSlots.includes(slot) ? "#721c24" : "#155724",
                  cursor: bookedSlots.includes(slot) ? "not-allowed" : "pointer",
                }}
              >
                {slot}
              </button>
            ))}
          </div>
          {selectedSlot && (
            <p
              style={{
                marginTop: "20px",
                fontWeight: "bold",
                color: "#155724",
              }}
            >
              ✅ Selected Slot: {selectedSlot}
            </p>
          )}
        </div>
      </div>

      {/* Service Selection Modal */}
      {showServiceModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select a Service</h3>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">-- Choose Service --</option>
              {barber.services.map((service) => (
                <option key={service} value={service}>
                  {service} ({barber.tarif[service]})
                </option>
              ))}
            </select>
            <div style={{ marginTop: "20px" }}>
              <button onClick={handleCancel} className="btn btn-danger">
                Cancel
              </button>{" "}
              <button
                onClick={handleServiceConfirm}
                className="btn btn-primary"
                disabled={!selectedService}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Choose Payment Method</h3>
            <label>
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Cash
            </label>{" "}
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Card
            </label>

            {paymentMethod === "card" && (
              <div style={{ marginTop: "15px" }}>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardInfo.number}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, number: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Expiry Date"
                  value={cardInfo.expiry}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, expiry: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardInfo.cvc}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, cvc: e.target.value })
                  }
                />
              </div>
            )}

            <div style={{ marginTop: "20px" }}>
              <button onClick={handleCancel} className="btn btn-danger">
                Cancel
              </button>{" "}
              <button
                onClick={handleReservationConfirm}
                className="btn btn-success"
                disabled={
                  !paymentMethod ||
                  (paymentMethod === "card" &&
                    (!cardInfo.number || !cardInfo.expiry || !cardInfo.cvc))
                }
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          width: 90%;
          max-width: 400px;
          text-align: center;
        }
        .modal-content input, .modal-content select {
          width: 100%;
          margin: 10px 0;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      `}</style>
    </>
  );
};

export default PublicBarberProfile;
