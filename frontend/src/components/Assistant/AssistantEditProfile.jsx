import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AssistantEditProfile = () => {
  const [assistant, setAssistant] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "img/user-placeholder.png",
    barber: { name: "" }
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preview, setPreview] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch assistant data
  useEffect(() => {
    const fetchAssistantData = async () => {
      try {
        const response = await axios.get("/api/assistants/me");
        setAssistant(response.data);
        setPreview(response.data.profilePicture);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load profile data");
        console.error("Fetch error:", error);
      }
    };

    fetchAssistantData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAssistant({ ...assistant, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async () => {
    try {
      await axios.patch("/api/assistants/me", {
        name: assistant.name,
        email: assistant.email,
        phone: assistant.phone
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update error:", error);
    }
  };

  const handleImageUpload = async () => {
    if (!newImage) {
      toast.warning("No new image selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profilePicture", newImage);

      const response = await axios.patch(
        "/api/assistants/me/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setAssistant({ ...assistant, profilePicture: response.data.profilePicture });
      toast.success("Profile picture updated!");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    }
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number, and special character"
      );
      return;
    }

    try {
      await axios.patch("/api/assistants/me/password", {
        currentPassword,
        newPassword
      });
      toast.success("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed");
      console.error("Password error:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center" style={{ paddingTop: "100px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5f5dc", minHeight: "100vh", paddingTop: "60px" }}>
      <nav id="menu" className="navbar navbar-default navbar-fixed-top" style={{ zIndex: 1000, position: "fixed", top: 0, left: 0, right: 0, backgroundColor: "#fff" }}>
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand page-scroll" href="/hpl">HajjemGo</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/profile" className="page-scroll"><i className="fa fa-user" style={{ fontSize: "20px" }}></i></a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="dashboard-container" style={{ maxWidth: "1000px", margin: "40px auto", padding: "30px", borderRadius: "20px", border: "4px solid #1e90ff", display: "flex", gap: "30px", background: "#fff", boxShadow: "0 0 20px rgba(0,0,0,0.1)", flexWrap: "wrap" }}>
        <div style={{ border: "3px solid #1e90ff", borderRadius: "15px", padding: "20px", textAlign: "center", width: "280px", flexShrink: 0, marginBottom: "30px" }}>
          <img src={preview} alt="Profile" className="img-responsive img-circle" style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover", marginBottom: "15px" }} />
          <input type="file" onChange={handleImageChange} accept="image/*" className="form-control-file mb-2" />
          <button className="btn btn-primary" onClick={handleImageUpload} style={{ background: "linear-gradient(to right, #6A82FB, #56CCF2)", border: "none", borderRadius: "20px", padding: "8px 20px", color: "#fff", fontWeight: "bold" }}>Upload Picture</button>

          <div className="mt-3">
            <p className="text-muted"><strong>Working at:</strong> {assistant.barber?.name}</p>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "30px" }}>
          <div style={{ border: "3px solid #1e90ff", borderRadius: "15px", padding: "20px", marginBottom: "30px" }}>
            <h4 className="mb-3">Update Info</h4>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={assistant.name} onChange={handleProfileChange} className="form-control mb-3" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={assistant.email} onChange={handleProfileChange} className="form-control mb-3" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={assistant.phone} onChange={handleProfileChange} className="form-control mb-3" />
            </div>
            <button className="btn btn-primary" onClick={handleProfileSubmit} style={{ background: "linear-gradient(to right, #6A82FB, #56CCF2)", border: "none", borderRadius: "20px", padding: "8px 25px", color: "#fff", fontWeight: "bold" }}>Save Profile</button>
          </div>

          <div style={{ border: "3px solid #1e90ff", borderRadius: "15px", padding: "20px" }}>
            <h4 className="mb-3">Change Password</h4>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" className="form-control mb-3" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-control mb-3" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" className="form-control mb-3" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} />
            </div>
            <button className="btn btn-primary" onClick={handleChangePassword} style={{ background: "linear-gradient(to right, #6A82FB, #56CCF2)", border: "none", borderRadius: "20px", padding: "8px 25px", color: "#fff", fontWeight: "bold" }}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};
