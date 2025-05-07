import React from "react";

export const AboutAs = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/aboutus.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>At HajjemGo, we believe that grooming should be convenient, accessible, and tailored to your lifestyle. That’s why we’ve created a platform that connects you with trusted local barbers and assistants—right from your phone. Whether you're at home, at work, or on the go, HajjemGo lets you book appointments, explore services, and enjoy top-tier grooming at your convenience. We're redefining the way people experience barbering by combining tradition with smart technology.</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>Convenience at Your Fingertips</li>
                    <li>Trusted Professionals</li>
                    <li>Personalized Experience</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                  <li>Location-Based Matching</li>
                  <li>Secure & Simple</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
