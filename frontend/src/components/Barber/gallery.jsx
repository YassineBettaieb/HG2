import { Image } from "./image";
import React from "react";

export const GalleryB = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
        </div>
        <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-4" style={{ textAlign: "center", marginBottom: "20px" }}>
    <img
      src="/img/g1.jpg"
      alt="Your Title 1"
      style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "8px" }}
    />
    <h5 style={{ marginTop: "10px" }}>Salim's Barber Shop</h5>
  </div>

  <div className="col-sm-6 col-md-4 col-lg-4" style={{ textAlign: "center", marginBottom: "20px" }}>
    <img
      src="/img/g2.jpg"
      alt="Your Title 2"
      style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "8px" }}
    />
    <h5 style={{ marginTop: "10px" }}>Chez Ahmad</h5>
  </div>
  <div className="col-sm-6 col-md-4 col-lg-4" style={{ textAlign: "center", marginBottom: "20px" }}>
    <img
      src="/img/g3.jpg"
      alt="Your Title 2"
      style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "8px" }}
    />
    <h5 style={{ marginTop: "10px" }}>Abdou's Shop</h5>
  </div>
  <div className="col-sm-6 col-md-4 col-lg-4" style={{ textAlign: "center", marginBottom: "20px" }}>
    <img
      src="/img/g4.jpg"
      alt="Your Title 2"
      style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "8px" }}
    />
    <h5 style={{ marginTop: "10px" }}>Chez Hbib</h5>
  </div>
  <div className="col-sm-6 col-md-4 col-lg-4" style={{ textAlign: "center", marginBottom: "20px" }}>
    <img
      src="/img/g5.jpg"
      alt="Your Title 2"
      style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "8px" }}
    />
    <h5 style={{ marginTop: "10px" }}>"Amen"</h5>
  </div>
  <div className="col-sm-6 col-md-4 col-lg-4" style={{ textAlign: "center", marginBottom: "20px" }}>
    <img
      src="/img/g6.jpg"
      alt="Your Title 2"
      style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "8px" }}
    />
    <h5 style={{ marginTop: "10px" }}>Hattem's Barber Shop</h5>
  </div>


</div>
        </div>
      </div>

  );
};
