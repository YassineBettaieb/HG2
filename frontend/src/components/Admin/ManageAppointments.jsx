import React, { useState } from "react";

const dummyAppointments = [
  {
    id: 1,
    clientName: "Ahmed Ben Ali",
    barberName: "Mohamed Hajjem",
    reservationTime: "2025-05-05 14:00",
    requestTime: "2025-05-04 10:22",
    services: ["Haircut", "Beard Trim"],
    price: "80 TND",
    status: "pending"
  },
  {
    id: 2,
    clientName: "Sami Kallel",
    barberName: "Karim Bacha",
    reservationTime: "2025-05-05 16:00",
    requestTime: "2025-05-04 12:10",
    services: ["Shaving"],
    price: "30 TND",
    status: "confirmed"
  },
  {
    id: 3,
    clientName: "Fatma Ben Ahmed",
    barberName: "Mohamed Hajjem",
    reservationTime: "2025-05-06 10:00",
    requestTime: "2025-05-05 09:15",
    services: ["Hair Coloring"],
    price: "120 TND",
    status: "completed"
  },
  {
    id: 4,
    clientName: "Youssef Trabelsi",
    barberName: "Ali Messaoud",
    reservationTime: "2025-05-06 11:30",
    requestTime: "2025-05-05 14:45",
    services: ["Haircut", "Facial"],
    price: "90 TND",
    status: "cancelled"
  },
  {
    id: 5,
    clientName: "Houssem Gharbi",
    barberName: "Karim Bacha",
    reservationTime: "2025-05-07 15:00",
    requestTime: "2025-05-06 18:30",
    services: ["Beard Trim"],
    price: "30 TND",
    status: "pending"
  },
];

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("reservationTime");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;

  const filteredAppointments = appointments
    .filter((appt) =>
      [appt.clientName, appt.barberName, appt.services.join(", "), appt.status].some((field) =>
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

  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(appt => 
      appt.id === id ? { ...appt, status: newStatus } : appt
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'confirmed': return 'green';
      case 'completed': return 'blue';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="appointment-management">
      <style>{`
        .appointment-management {
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
        tr:hover {
          background-color: #f5f5f5;
        }
        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          text-transform: capitalize;
        }
        .action-btn {
          margin-right: 8px;
          padding: 6px 12px;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
        }
        .confirm-btn { background: #4caf50; }
        .cancel-btn { background: #f44336; }
        .complete-btn { background: #2196f3; }

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

      <h2>Appointment Management Dashboard</h2>
      <input
        type="text"
        placeholder="Search appointments by client, barber, service, or status..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort("clientName")}>Client Name</th>
            <th onClick={() => toggleSort("barberName")}>Barber Name</th>
            <th onClick={() => toggleSort("reservationTime")}>Reservation Time</th>
            <th onClick={() => toggleSort("requestTime")}>Request Time</th>
            <th>Services</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.clientName}</td>
              <td>{appt.barberName}</td>
              <td>{appt.reservationTime}</td>
              <td>{appt.requestTime}</td>
              <td>{appt.services.join(", ")}</td>
              <td>{appt.price}</td>
              <td>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(appt.status) }}
                >
                  {appt.status}
                </span>
              </td>
              <td>
                {appt.status === "pending" && (
                  <>
                    <button 
                      className="action-btn confirm-btn"
                      onClick={() => handleStatusChange(appt.id, "confirmed")}
                    >
                      Confirm
                    </button>
                    <button 
                      className="action-btn cancel-btn"
                      onClick={() => handleStatusChange(appt.id, "cancelled")}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {appt.status === "confirmed" && (
                  <button 
                    className="action-btn complete-btn"
                    onClick={() => handleStatusChange(appt.id, "completed")}
                  >
                    Complete
                  </button>
                )}
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
    </div>
  );
};

export default ManageAppointments;