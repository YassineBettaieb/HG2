import React, { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";

// EditUserModal Component
const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedUser);
    onClose();
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={updatedUser.phone}
            onChange={handleChange}
          />
        </label>
        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  ) : null;
};

export const ManageUsers = () => {
  const allUsers = [
    {
      id: 1,
      name: "Alice Smith",
      phone: "123-456-7890",
      email: "alice@example.com",
      appointments: [
        { status: "accepted" },
        { status: "refused" },
      ],
      image: "", // image URL or empty string
    },
    {
      id: 2,
      name: "Bob Johnson",
      phone: "987-654-3210",
      email: "bob@example.com",
      appointments: [{ status: "onhold" }],
      image: "https://i.pravatar.cc/100?img=2",
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    // In a real app, this would update the state or make an API call
    console.log("User updated:", updatedUser);
  };

  return (
    <div className="manage-users-page">
      <style>{`
        .manage-users-container {
          padding: 120px 20px 40px;
          background-color: rgb(253, 243, 225);
          min-height: 100vh;
        }

        .section-title {
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        .search-bar {
          margin: 10px auto 30px;
          max-width: 400px;
        }

        .search-bar input {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .user-table th, .user-table td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .user-table th {
          background-color: rgb(211, 95, 95);
          color: white;
          font-weight: bold;
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .profile-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .status-badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 12px;
          margin: 2px;
        }

        .accepted { background-color: #28a745; color: white; }
        .refused { background-color: #dc3545; color: white; }
        .onhold { background-color: #ffc107; color: #222; }

        .delete-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: red;
          font-size: 18px;
        }

        .edit-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #007bff;
          font-size: 18px;
        }

        /* Navbar Styles */
        .navbar {
          background-color: #222;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }

        .navbar-brand {
          font-weight: bold;
          font-size: 20px;
          color: white;
          text-decoration: none;
        }

        /* Modal Styles */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .modal label {
          display: block;
          margin-top: 10px;
          font-weight: bold;
        }

        .modal input {
          width: 100%;
          padding: 8px;
          margin: 5px 0 15px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .modal button {
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }

        .save-btn {
          background-color: #007bff;
          color: white;
        }

        .close-btn {
          background-color: #6c757d;
          color: white;
        }

        /* Pagination Styles */
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          gap: 10px;
        }

        .pagination button {
          padding: 8px 14px;
          border-radius: 5px;
          border: 1px solid #00bcd4;
          background: white;
          color: #00bcd4;
          cursor: pointer;
        }

        .pagination button.active {
          background: #00bcd4;
          color: white;
        }

        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .manage-users-container {
            padding: 100px 10px 40px;
          }

          .modal-content {
            width: 90%;
          }

          .user-table th, .user-table td {
            font-size: 14px;
            padding: 10px;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 22px;
          }

          .user-table th, .user-table td {
            padding: 8px;
            font-size: 12px;
          }

          .modal-buttons {
            flex-direction: column;
          }

          .modal button {
            width: 100%;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/admin">
              HajjemGo
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/ProfileA">
                <i className="fa fa-user" style={{ fontSize: "20px", color: "red" }}></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <div className="manage-users-container">
        <h2 className="section-title">Manage Users</h2>
        <p style={{ textAlign: "center" }}>Total Users: {allUsers.length}</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {currentUsers.length > 0 ? (
          <>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>E-mail</th>
                  <th>Appointments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="profile-info">
                        <img
                          className="profile-img"
                          src={user.image || "https://via.placeholder.com/40"}
                          alt={user.name}
                        />
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.appointments.map((a, idx) => (
                        <span key={idx} className={`status-badge ${a.status}`}>
                          {a.status}
                        </span>
                      ))}
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditUser(user)}
                        aria-label="Edit user"
                      >
                        <FaPen />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => alert(`Delete user ${user.name}`)}
                        aria-label="Delete user"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>No users found.</p>
        )}
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
};