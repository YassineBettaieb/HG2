import React from "react";

export const TeamU = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Meet the Team</h2>
          <p>
          "The Team Making Barbering Smarter"
          </p>
        </div>
        <div id="row">
                <div className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    {" "}
                    <img src="img/tayeb.jpg" alt="..." className="team-img" />
                    <div className="caption">
                      <h4>Yassine Bettaieb</h4>
                      <p>Developper</p>
                    </div>
                  </div>
                </div>

        </div>
      </div>
    </div>
  );
};
