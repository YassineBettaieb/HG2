import React, { useState } from "react";

const dummyBarbers = [
  {
    id: 1,
    name: "Barber A",
    phone: "123-456-7890",
    email: "barberA@example.com",
    location: "Downtown",
    appointments: ["Client1 - 10:00", "Client2 - 11:00"],
    assistants: 2,  // Number of assistants
  },
  {
    id: 2,
    name: "Barber B",
    phone: "222-456-7890",
    email: "barberB@example.com",
    location: "Uptown",
    appointments: ["Client3 - 12:00"],
    assistants: 1,  // Number of assistants
  },
  {
    id: 3,
    name: "Barber C",
    phone: "333-456-7890",
    email: "barberC@example.com",
    location: "Midtown",
    appointments: [],
    assistants: 0,  // Number of assistants
  },
  {
    id: 4,
    name: "Barber D",
    phone: "444-456-7890",
    email: "barberD@example.com",
    location: "Eastside",
    appointments: [],
    assistants: 3,  // Number of assistants
  },
  {
    id: 5,
    name: "Barber E",
    phone: "555-456-7890",
    email: "barberE@example.com",
    location: "Westside",
    appointments: [],
    assistants: 0,  // Number of assistants
  },
  {
    id: 6,
    name: "Barber F",
    phone: "666-456-7890",
    email: "barberF@example.com",
    location: "Uptown",
    appointments: [],
    assistants: 1,  // Number of assistants
  },
];
const dummyAssistants = {
    1: [
      { id: "A1", name: "Ali", phone: "111-111-1111", email: "ali@assist.com" },
      { id: "A2", name: "Sara", phone: "222-222-2222", email: "sara@assist.com" },
    ],
    2: [
      { id: "A3", name: "Omar", phone: "333-333-3333", email: "omar@assist.com" },
    ],
    4: [
      { id: "A4", name: "Moez", phone: "444-444-4444", email: "moez@assist.com" },
      { id: "A5", name: "Lina", phone: "555-555-5555", email: "lina@assist.com" },
      { id: "A6", name: "Zied", phone: "666-666-6666", email: "zied@assist.com" },
    ],
    6: [
      { id: "A7", name: "Nour", phone: "777-777-7777", email: "nour@assist.com" },
    ],
  };

const ManageBarbers = () => {
    const [selectedAssistants, setSelectedAssistants] = useState([]);
  const [barbers, setBarbers] = useState(dummyBarbers);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [editingBarber, setEditingBarber] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleView = (barber) => {
    setSelectedBarber(barber);
    setSelectedAssistants(dummyAssistants[barber.id] || []);
  };
  const handleEditAssistant = (assistant) => {
    alert(`Editing assistant: ${assistant.name}`);
    // You can replace this alert with a modal or form to update the assistant data
  };
  
  const handleDeleteAssistant = (id) => {
    const updatedAssistants = { ...dummyAssistants };
    for (const barberId in updatedAssistants) {
      updatedAssistants[barberId] = updatedAssistants[barberId].filter(a => a.id !== id);
    }
    // You may want to update both state and dummyAssistants if editing live data
    alert(`Deleted assistant with id: ${id}`);
    setSelectedAssistants(
      selectedAssistants.filter((a) => a.id !== id)
    );
  };
  

  const barbersPerPage = 5;

  const filteredBarbers = barbers
    .filter((b) =>
      [b.name, b.email, b.location].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sortKey].toLowerCase();
      const bValue = b[sortKey].toLowerCase();
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const totalPages = Math.ceil(filteredBarbers.length / barbersPerPage);
  const currentBarbers = filteredBarbers.slice(
    (currentPage - 1) * barbersPerPage,
    currentPage * barbersPerPage
  );

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleDelete = (id) => {
    setBarbers(barbers.filter((b) => b.id !== id));
    setShowConfirmDelete(false);
    setSelectedBarber(null);
  };

  const handleSaveEdit = (updatedBarber) => {
    setBarbers(barbers.map((b) => (b.id === updatedBarber.id ? updatedBarber : b)));
    setEditingBarber(null);
  };

  return (
    <div className="manage-barbers">
      <style>{`
        .manage-barbers {
          padding: 30px;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right, #e0f7fa, #fff);
          min-height: 100vh;
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #007bff;
        }
        input[type="text"] {
          display: block;
          margin: 0 auto 20px auto;
          padding: 10px;
          width: 60%;
          border: 2px solid #00bcd4;
          border-radius: 8px;
        }
        table {
          width: 100%;
          background: white;
          border-collapse: collapse;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 123, 255, 0.2);
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        th {
          background-color: #00bcd4;
          color: white;
          cursor: pointer;
        }
        th:hover {
          background-color: #0097a7;
        }
        td button {
          margin-right: 8px;
          padding: 6px 12px;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
        }
        .view-btn { background: #4caf50; }
        .edit-btn { background: #2196f3; }
        .delete-btn { background: #f44336; }

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

        .modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
}
        .modal-content h3 {
          margin-top: 0;
          color: #007bff;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group input {
          width: 100%;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      `}</style>

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
            <a className="navbar-brand page-scroll" href="/admin">
              HajjemGo
            </a>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/ProfileA" className="page-scroll">
                  <i
                    className="fa fa-user"
                    style={{ fontSize: "20px", color: "red" }}
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h2>Manage Barbers</h2>
      <input
        type="text"
        placeholder="Search barbers by name, email, or location..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort("name")}>Name</th>
            <th>Phone</th>
            <th onClick={() => toggleSort("email")}>Email</th>
            <th onClick={() => toggleSort("location")}>Location</th>
            <th>Appointments</th>
            <th>Assistants</th> {/* New column for assistants */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentBarbers.map((barber) => (
  <tr key={barber.id}>
    <td>{barber.name}</td>
    <td>{barber.phone}</td>
    <td>{barber.email}</td>
    <td>{barber.location}</td>
    <td>{barber.appointments.length}</td>
    <td>
  <button
    style={{ color: "#007bff", background: "none", border: "none", cursor: "pointer" }}
    onClick={() => {
      if (barber.assistants > 0) {
        setSelectedAssistants(dummyAssistants[barber.id] || []);
      } else {
        alert("No assistant available!!!");
      }
    }}
  >
    {barber.assistants}
  </button>
</td> {/* Display assistants count */}
    <td>
    <button className="view-btn" onClick={() => handleView(barber)}>
  View
</button>
      <button
        className="edit-btn"
        onClick={() => setEditingBarber(barber)}
      >
        Edit
      </button>
      <button
        className="delete-btn"
        onClick={() => {
          setSelectedBarber(barber);
          setShowConfirmDelete(true);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
))}

    </tbody>
    </table>
      {/* Pagination */}
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

  {/* Delete confirmation */}
  {showConfirmDelete && (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure you want to delete this barber?</h3>
        <div className="form-group">
          <button onClick={() => handleDelete(selectedBarber.id)}>
            Yes, Delete
          </button>
          <button onClick={() => setShowConfirmDelete(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Edit Barber Modal */}
  {editingBarber && (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Barber Details</h3>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={editingBarber.name}
            onChange={(e) =>
              setEditingBarber({ ...editingBarber, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={editingBarber.email}
            onChange={(e) =>
              setEditingBarber({ ...editingBarber, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <button
            onClick={() => handleSaveEdit(editingBarber)}
            className="save-btn"
          >
            Save
          </button>
          <button
            onClick={() => setEditingBarber(null)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
  {selectedAssistants && (
  <div className="modal" onClick={() => setSelectedAssistants(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>Assistant Dashboard</h3>
      {selectedAssistants.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc" }}>Name</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Phone</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Email</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {selectedAssistants?.map((assistant) => (
  <tr key={assistant.id}>
    <td>{assistant.name}</td>
    <td>{assistant.phone}</td>
    <td>{assistant.email}</td>
    <td>
      <button className="edit-btn" onClick={() => handleEditAssistant(assistant)}>Edit</button>
      <button className="delete-btn" onClick={() => handleDeleteAssistant(assistant.id)}>Delete</button>
    </td>
  </tr>
))}
          </tbody>
        </table>
      ) : (
        <p>No assistants found.</p>
      )}
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <button
          onClick={() => setSelectedAssistants(null)}
          style={{
            background: "#f44336",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{selectedBarber && (
  <div className="modal" onClick={() => setSelectedBarber(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>{selectedBarber.name}'s Profile</h3>
      <img
        src={`https://via.placeholder.com/150?text=${selectedBarber.name}`}
        alt="Profile"
        style={{ borderRadius: "8px", marginBottom: "15px" }}
      />
      <p><strong>Email:</strong> {selectedBarber.email}</p>
      <p><strong>Phone:</strong> {selectedBarber.phone}</p>
      <p><strong>Location:</strong> {selectedBarber.location}</p>
      <p><strong>Geolocation:</strong> Latitude: 36.8065, Longitude: 10.1815</p>
      <p><strong>Services:</strong> Haircut, Beard Trim, Facial</p>

      <h4>Appointments:</h4>
      <ul>
        {selectedBarber.appointments.length > 0 ? (
          selectedBarber.appointments.map((appt, i) => <li key={i}>{appt}</li>)
        ) : (
          <li>No appointments</li>
        )}
      </ul>

      <h4>Assistants:</h4>
      <ul>
        {selectedAssistants.length > 0 ? (
          selectedAssistants.map((a) => (
            <li key={a.id}>
              {a.name} - {a.email} - {a.phone}
            </li>
          ))
        ) : (
          <li>No assistants</li>
        )}
      </ul>

      <button
        onClick={() => setSelectedBarber(null)}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#f44336",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
{selectedBarber && (
  <div className="modal" onClick={() => setSelectedBarber(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>{selectedBarber.name} - Full Profile</h3>
      <p><strong>Phone:</strong> {selectedBarber.phone}</p>
      <p><strong>Email:</strong> {selectedBarber.email}</p>
      <p><strong>Location:</strong> {selectedBarber.location}</p>
      <p><strong>Appointments:</strong></p>
      <ul>
        {selectedBarber.appointments.length > 0 ? (
          selectedBarber.appointments.map((appt, i) => <li key={i}>{appt}</li>)
        ) : (
          <li>No appointments</li>
        )}
      </ul>

      <p><strong>Assistants:</strong></p>
      {selectedAssistants.length > 0 ? (
        <table style={{ width: '100%', marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedAssistants.map((assistant) => (
              <tr key={assistant.id}>
                <td>{assistant.name}</td>
                <td>{assistant.phone}</td>
                <td>{assistant.email}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditAssistant(assistant)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteAssistant(assistant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assistants</p>
      )}

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button className="delete-btn" onClick={() => setSelectedBarber(null)}>Close</button>
      </div>
    </div>
  </div>
)}

</div>
);
};

export default ManageBarbers;