import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navigation } from "./components/home page/navigation";
import { Header } from "./components/home page/header";
import { Features } from "./components/home page/features";
import { About } from "./components/home page/about";
import { Services } from "./components/home page/services";
import { Gallery } from "./components/home page/gallery";
import { Testimonials } from "./components/home page/testimonials";
import { Team } from "./components/home page/Team";
import { Contact } from "./components/home page/contact";
import { NavigationU } from "./components/User/navigation";
import { HeaderU } from "./components/User/header";
import { FeaturesU } from "./components/User/features";
import { AboutU } from "./components/User/about";
import { ServicesU } from "./components/User/services";
import { GalleryU } from "./components/User/gallery";
import { TestimonialsU } from "./components/User/testimonials";
import { TeamU } from "./components/User/Team";
import { ContactU } from "./components/User/contact";
import {Login} from "./components/User/login";
import Register from "./components/User/Register";
import RegisterB from "./components/User/RegisterB";
import {Profile} from "./components/User/profile";
import {SearchB} from "./components/User/searchB";
import PublicBarberProfile from "./components/User/PublicBarberProfile"



import {ClientEditProfile} from "./components/User/ClientEditProfile";
import { NavigationA } from "./components/Admin/navigation";
import { HeaderA } from "./components/Admin/header";
import { FeaturesA } from "./components/Admin/features";
import { AboutA } from "./components/Admin/about";
import { ServicesA } from "./components/Admin/services";
import { GalleryA } from "./components/Admin/gallery";
import { TestimonialsA } from "./components/Admin/testimonials";
import { TeamA } from "./components/Admin/Team";
import { ContactA } from "./components/Admin/contact";
import { ManageUsers } from "./components/Admin/ManageUsers";
import ManageBarbers from "./components/Admin/ManageBarbers";

import { NavigationB } from "./components/Barber/navigation";
import {ProfileB} from "./components/Barber/profileB";
import { HeaderB } from "./components/Barber/header";
import { FeaturesB } from "./components/Barber/features";
import { AboutB } from "./components/Barber/about";
import { ServicesB } from "./components/Barber/services";
import { GalleryB } from "./components/Barber/gallery";
import { TestimonialsB } from "./components/Barber/testimonials";
import { TeamB } from "./components/Barber/Team";
import { ContactB } from "./components/Barber/contact";
import {BarberEditProfile} from "./components/Barber/BarberEditProfile";



import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { ProfileA } from "./components/Admin/ProfileA";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <Header data={landingPageData.Header} />
              <Features data={landingPageData.Features} />
              <About data={landingPageData.About} />
              <Services data={landingPageData.Services} />
              <Gallery data={landingPageData.Gallery} />
              <Testimonials data={landingPageData.Testimonials} />
              <Team data={landingPageData.Team} />
              <Contact data={landingPageData.Contact} />
            </>
          }
        />
        <Route
          path="/hpl"
          element={
            <><NavigationU />
            <HeaderU data={landingPageData.Header} />
            <FeaturesU data={landingPageData.Features} />
            <AboutU data={landingPageData.About} />
            <ServicesU data={landingPageData.Services} />
            <GalleryU data={landingPageData.Gallery} />
            <TestimonialsU data={landingPageData.Testimonials} />
            <TeamU data={landingPageData.Team} />
            <ContactU data={landingPageData.Contact} />
            <searchB data={landingPageData.searchB} />
            </>
          }
            />
 <Route
          path="/bb"
          element={
            <><NavigationB />
            <HeaderB data={landingPageData.Header} />
            <FeaturesB data={landingPageData.Features} />
            <AboutB data={landingPageData.About} />
            <ServicesB data={landingPageData.Services} />
            <GalleryB data={landingPageData.Gallery} />
            <TestimonialsB data={landingPageData.Testimonials} />
            <TeamB data={landingPageData.Team} />
            <ContactB data={landingPageData.Contact} />
            </>
          }
            />
<Route
          path="/admin"
          element={
            <>
              <NavigationA />
              <HeaderA data={landingPageData.HeaderA} />
              <FeaturesA data={landingPageData.FeaturesA} />
              <AboutA data={landingPageData.AboutA} />
              <ServicesA data={landingPageData.ServicesA} />
              <GalleryA data={landingPageData.GalleryA} />
              <TestimonialsA data={landingPageData.TestimonialsA} />
              <TeamA data={landingPageData.TeamA} />
              <ContactA data={landingPageData.ContactA} />
              
            </>
          }
        />
        {/* Login page route */}
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegisterB" element={<RegisterB />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ProfileB" element={<ProfileB />} />
        <Route path="/ProfileA" element={<ProfileA />} />
        <Route path="/searchB" element={<SearchB />} />
        <Route path="/ClientEditProfile" element={<ClientEditProfile />} />
        <Route path="/BarberEditProfile" element={<BarberEditProfile />} />
        <Route path="/ManageUsers" element={<ManageUsers />} />
        <Route path="/ManageBarbers" element={<ManageBarbers />} />
        <Route path="/PublicBarberProfile" element={<PublicBarberProfile />} />

      </Routes>
    </Router>
  );
};

export default App;
