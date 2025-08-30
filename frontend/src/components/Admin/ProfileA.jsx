import React from "react";

export const ProfileA = () => {
  const dashboardData = {
    totalUsers: 124,
    totalBarbers: 45,
    totalAssistants: 20,
    totalAppointments: 310,
  };

  const randomUsers = ["Alice", "Bob", "Charlie", "David", "Eva"];
  const randomBarbers = ["Barber A", "Barber B", "Barber C", "Barber D", "Barber E"];
  const randomAssistants = ["Asst A", "Asst B", "Asst C", "Asst D", "Asst E"];
  const appointments = [
    "Alice → Barber A",
    "Bob → Barber B",
    "Charlie → Barber C",
    "David → Barber D",
    "Eva → Barber E",
  ];

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
        }

        .dashboard-container {
          background-color: #f9f9f9;
          color: #222;
          min-height: 100vh;
        }

        nav.navbar {
          background-color: #fff;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 10px 0;
        }

        .navbar-brand {
          font-weight: bold;
          font-size: 1.5rem;
          color: #222;
        }

        .navbar-toggle .icon-bar {
          background-color: #222;
        }

        .navbar-nav > li > a {
          color: #222 !important;
          font-weight: 500;
        }

        .navbar-nav > li > a:hover {
          color: #007bff !important;
        }

        .dashboard-main {
          padding: 40px 20px;
        }

        .dashboard-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .dashboard-section {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .card {
          background-color: #f1f1f1;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
          margin-bottom: 10px;
        }

        .list-card {
          max-height: 160px;
          overflow-y: auto;
        }

        .list-item {
          background-color: #eaeaea;
          margin: 5px 0;
          padding: 8px;
          border-radius: 5px;
          font-size: 14px;
        }

        .dashboard-link {
  margin: 15px auto 0; /* top margin + auto for horizontal centering */
  display: block; /* change to block to allow margin auto to work */
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
}

        .dashboard-link:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div className="dashboard-container">
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

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="/ProfileA" className="page-scroll">
                    <i className="fa fa-user" style={{ fontSize: "20px", color: "red" }}></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="dashboard-main">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <div className="dashboard-grid">
            <section className="dashboard-section">
              <div className="card">
                <h4>Total Users</h4>
                <p>{dashboardData.totalUsers}</p>
              </div>
              <div className="card list-card">
                <h5>Users</h5>
                {randomUsers.map((user, i) => (
                  <div key={i} className="list-item">{user}</div>
                ))}
              </div>
              <a href="/ManageUsers" className="dashboard-link">Manage Users</a>
            </section>

            <section className="dashboard-section">
              <div className="card">
                <h4>Total Barbers</h4>
                <p>{dashboardData.totalBarbers}</p>
              </div>
              <div className="card list-card">
                <h5>Barbers</h5>
                {randomBarbers.map((b, i) => (
                  <div key={i} className="list-item">{b}</div>
                ))}
              </div>
              <div className="card">
                <h4>Total Assistants</h4>
                <p>{dashboardData.totalAssistants}</p>
              </div>
              <div className="card list-card">
                <h5>Assistants</h5>
                {randomAssistants.map((a, i) => (
                  <div key={i} className="list-item">{a}</div>
                ))}
              </div>
              <a href="/ManageBarbers" className="dashboard-link">Manage Barbers</a>
              
            </section>

            <section className="dashboard-section">
              <div className="card">
                <h4>Total Appointments</h4>
                <p>{dashboardData.totalAppointments}</p>
              </div>
              <div className="card list-card">
                <h5>Recent Appointments</h5>
                {appointments.map((a, i) => (
                  <div key={i} className="list-item">{a}</div>
                ))}
              </div>
              <a href="/ManageAppointments" className="dashboard-link">Manage Appointments</a>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};
