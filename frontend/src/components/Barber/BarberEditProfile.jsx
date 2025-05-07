import React, { useState } from "react";

export const BarberEditProfile = () => {
  const [barber, setBarber] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+216 55 123 456",
    role: "Barber",
    profilePicture: "img/user-placeholder.png", // default
    services: "Haircut, Shave", // example
    location: "Tunis, Tunisia", // example
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preview, setPreview] = useState(barber.profilePicture);
  const [newImage, setNewImage] = useState(null);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setBarber({ ...barber, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = () => {
    alert("Profile information updated!");
  };

  const handleImageUpload = () => {
    if (!newImage) return alert("No new image selected.");
    alert("Profile picture updated!");
  };

  const handleChangePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      alert(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    alert("Password changed successfully!");
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5dc", // Beige background color
        minHeight: "100vh", // Ensures the page covers the entire height
        paddingTop: "60px", // Adds padding to the top to avoid content being hidden behind the fixed navbar
      }}
    >
      {/* Navigation */}
      <nav
        id="menu"
        className="navbar navbar-default navbar-fixed-top"
        style={{
          zIndex: 1000,
          position: "fixed", // Make navbar fixed
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff", // Make the background white
        }}
      >
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
            <a className="navbar-brand page-scroll" href="/bb">
              HajjemGo
            </a>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/profileB" className="page-scroll">
                  <i className="fa fa-scissors" style={{ fontSize: "20px" }}></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content: Profile Edit Section */}
      <div
        className="dashboard-container"
        style={{
          maxWidth: "1000px",
          margin: "0 auto", // Adjusted to center the content
          marginTop:"40px",
          padding: "30px",
          borderRadius: "20px",
          border: "4px solid #1e90ff", // Blue border color
          display: "flex",
          gap: "30px",
          background: "#fff", // White background for the content area
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          flexWrap: "wrap",
        }}
      >
        {/* Left Panel: Profile Picture */}
        <div
          style={{
            border: "3px solid #1e90ff", // Blue border for this section
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center",
            width: "280px",
            flexShrink: 0,
            marginBottom: "30px", // Space below the left panel
          }}
        >
          <img
            src={preview}
            alt="Profile"
            className="img-responsive img-circle"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "15px",
            }}
          />
          <input type="file" onChange={handleImageChange} />
          <button
            className="btn btn-custom mt-2"
            onClick={handleImageUpload}
          >
            Upload Picture
          </button>
        </div>

        {/* Right Panel: Two stacked boxes */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "30px" }}>
          {/* Profile Info */}
          <div
            style={{
              border: "3px solid #1e90ff", // Blue border for this section
              borderRadius: "15px",
              padding: "20px",
              marginBottom: "30px", // Space between sections
            }}
          >
            <h4 className="mb-3">Update Info</h4>
            <input
              type="text"
              name="name"
              value={barber.name}
              onChange={handleProfileChange}
              className="form-control mb-3"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={barber.email}
              onChange={handleProfileChange}
              className="form-control mb-3"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={barber.phone}
              onChange={handleProfileChange}
              className="form-control mb-3"
              placeholder="Phone"
            />
            
            <input
              type="text"
              name="location"
              value={barber.location}
              onChange={handleProfileChange}
              className="form-control mb-3"
              placeholder="Location"
            />
            <button
              className="btn btn-custom"
              onClick={handleProfileSubmit}
            >
              Save Profile
            </button>
          </div>

          {/* Change Password */}
          <div
            style={{
              border: "3px solid #1e90ff", // Blue border for this section
              borderRadius: "15px",
              padding: "20px",
            }}
          >
            <h4 className="mb-3">Change Password</h4>
            <input
              type="password"
              placeholder="Current Password"
              className="form-control mb-3"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="New Password"
              className="form-control mb-3"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="form-control mb-3"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
            />
            <button
              className="btn btn-custom"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
