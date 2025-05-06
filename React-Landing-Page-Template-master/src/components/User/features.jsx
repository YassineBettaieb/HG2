import React from "react";

export const FeaturesU = () => {
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row">
          <div className="col-xs-6 col-md-3">
            <i className="fa fa-search" aria-hidden="true"></i>
            <h3>Find Nearby Barbers</h3>
            <p>Quickly discover professional barbers around your location using real-time geolocation.</p>
          </div>
          <div className="col-xs-6 col-md-3">
            <i className="fa fa-calendar fa-3x" aria-hidden="true"></i>
            <h3>Easy Appointment Booking</h3>
            <p>Schedule appointments in seconds with available time slots — no calls, no waiting.</p>
          </div>
          <div className="col-xs-6 col-md-3">
            <i className="fa fa-shield fa-3x" aria-hidden="true"></i>
            <h3>Secure Login & Data</h3>
            <p>All user and barber data is protected with strong authentication and secure storage.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
