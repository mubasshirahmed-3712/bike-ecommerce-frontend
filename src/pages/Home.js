import React, { useEffect } from "react";
import "../styles/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import bike9 from "../assets/images2/bike9.jpg";
import bike11 from "../assets/images2/bike11.jpg";
import bike15 from "../assets/images2/bike15.jpeg";
import bike14 from "../assets/images2/bike14.jpg";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-up">
        <h1>Ride the Future</h1>
        <p>Explore our collection of high-performance superbikes.</p>
        <div className="cta-buttons">
          <a href="/products" className="btn btn-primary">Shop Now</a>
          <a href="/about" className="btn btn-secondary">Learn More</a>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="featured-bikes" data-aos="fade-up">
        <h2>Featured Bikes</h2>
        <div className="bike-grid">
          {[{ img: bike14, name: "Kawasaki Z1000" }, { img: bike11, name: "MV Agusta F4" }, { img: bike15, name: "Continental GT650" }, { img: bike9, name: "Triumph Daytona 675" }]
            .map((bike, index) => (
              <div key={index} className="bike-card" data-aos="zoom-in">
                <img src={bike.img} alt={bike.name} />
                <h3>{bike.name}</h3>
              </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us" data-aos="fade-up">
        <h2>Why Choose Us?</h2>
        <ul>
          <li data-aos="fade-right">Top-quality superbikes with cutting-edge technology</li>
          <li data-aos="fade-right">Unmatched customer service and support</li>
          <li data-aos="fade-right">Secure payment options and fast delivery</li>
          <li data-aos="fade-right">Worldwide shipping with tracking</li>
          <li data-aos="fade-right">Exclusive deals and discounts for members</li>
          <li data-aos="fade-right">Flexible financing options available</li>
          <li data-aos="fade-right">Thorough quality checks for every bike</li>
          <li data-aos="fade-right">Comprehensive warranty on all bikes</li>
          <li data-aos="fade-right">Eco-friendly and sustainable manufacturing</li>
        </ul>
      </section>

      {/* Customer Reviews */}
      <section className="customer-reviews" data-aos="fade-up">
        <h2>What Our Customers Say</h2>
        <div className="review" data-aos="flip-up">
          <p>"The best superbike store! High-quality bikes and great service!"</p>
          <p>- John D.</p>
        </div>
        <div className="review" data-aos="flip-up">
          <p>"Fantastic bikes and excellent after-sales support. Highly recommend!"</p>
          <p>- Sarah P.</p>
        </div>
        <div className="review" data-aos="flip-up">
          <p>"My Speedster GT is a dream to ride. Thanks for the awesome service!"</p>
          <p>- Mark R.</p>
        </div>
        <div className="review" data-aos="flip-up">
          <p>"Superbikes delivered right to my door with the best packaging!"</p>
          <p>- Emma W.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
