import React from "react";

export const HeaderA = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
              <a
                  href="/searchB"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Nearby Barber
                </a>{" "}
                <h1>
                "Your Next Cut is Just a Click Away with HajjemGo."
                </h1>
                <p>No more waiting — book your barber instantly and enjoy a fresh cut wherever you are.</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
