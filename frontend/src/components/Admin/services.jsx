import React from "react";

export const ServicesA = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
        </div>
        <div className="row">
                <div className="col-md-4">
                  {" "}
                  <i className="fa fa-scissors fa-3x" aria-hidden="true"></i>
                  <div className="service-desc">
                    <h3>Haircuts</h3>
                    <p>Classic, modern, or custom styles — our barbers deliver precision cuts tailored to your look.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {" "}
                  <i className="fa fa-user fa-3x" aria-hidden="true"></i>
                  <div className="service-desc">
                    <h3>Beard Trimming & Styling</h3>
                    <p>Shape, trim, or redefine your beard with expert care and attention to detail.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {" "}
                  <i className="fa fa-tint fa-3x" aria-hidden="true"></i>
                  <div className="service-desc">
                    <h3>Hair Washing</h3>
                    <p>Refresh your look and feel great with professional washing and scalp treatments.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {" "}
                  <i className="fa fa-scissors fa-3x" aria-hidden="true"></i>
                  <div className="service-desc">
                    <h3>Hair Styling</h3>
                    <p>From casual to formal, get the perfect finish for any occasion.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {" "}
                  <i className="fa fa-calendar fa-3x" aria-hidden="true"></i>
                  <div className="service-desc">
                    <h3>Scheduled Appointments</h3>
                    <p>Book your preferred service, time, and barber in just a few clicks.</p>
                  </div>
                </div>

        </div>
      </div>
    </div>
  );
};
