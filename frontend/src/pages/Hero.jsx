import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(images/bg.jpeg)",
  }}>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
      Rent cars and bikes with ease. Whether it's a road trip or a city commute, we have the vehicle for you.
      Browse our wide selection, book your ride, and hit the road today!
      </p>
      <Link to="/dashboard">
            <button className="btn btn-primary">Get Started</button>
          </Link>
    </div>
  </div>
</div>
  );
};

export default Hero;
