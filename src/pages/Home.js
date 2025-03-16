import React from "react";
import { motion } from "framer-motion";
import "../styles/Home.css";
import bike9 from "../assets/images2/bike9.jpg";
import bike11 from "../assets/images2/bike11.jpg";
import bike15 from "../assets/images2/bike15.jpeg";
import bike14 from "../assets/images2/bike14.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1>Ride the Future</h1>
        <p>Explore our collection of high-performance superbikes.</p>
        <div className="cta-buttons">
          <motion.a href="/products" className="btn btn-primary" whileHover={{ scale: 1.1 }}>
            Shop Now
          </motion.a>
          <motion.a href="/about" className="btn btn-secondary" whileHover={{ scale: 1.1 }}>
            Learn More
          </motion.a>
        </div>
      </motion.section>

      {/* Featured Bikes Section */}
      <motion.section className="featured-bikes" variants={staggerContainer} initial="hidden" animate="visible">
        <h2>Featured Bikes</h2>
        <div className="bike-grid">
          {[{ img: bike14, name: "Kawasaki Z1000" }, { img: bike11, name: "MV Agusta F4" }, { img: bike15, name: "Continental GT650" }, { img: bike9, name: "Triumph Daytona 675" }]
            .map((bike, index) => (
              <motion.div key={index} className="bike-card" variants={fadeInUp}>
                <img src={bike.img} alt={bike.name} loading="lazy" />
                <h3>{bike.name}</h3>
              </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section className="why-choose-us" variants={fadeInUp} initial="hidden" animate="visible">
        <h2>Why Choose Us?</h2>
        <ul>
          {[
            "Top-quality superbikes with cutting-edge technology",
            "Unmatched customer service and support",
            "Secure payment options and fast delivery",
            "Worldwide shipping with tracking",
            "Exclusive deals and discounts for members",
            "Flexible financing options available",
            "Thorough quality checks for every bike",
            "Comprehensive warranty on all bikes",
            "Eco-friendly and sustainable manufacturing",
          ].map((reason, index) => (
            <motion.li key={index} variants={fadeInUp}>
              {reason}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Customer Reviews */}
      <motion.section className="customer-reviews" variants={fadeInUp} initial="hidden" animate="visible">
        <h2>What Our Customers Say</h2>
        {[
          { text: `"The best superbike store! High-quality bikes and great service!"`, author: "- John D." },
          { text: `"Fantastic bikes and excellent after-sales support. Highly recommend!"`, author: "- Sarah P." },
          { text: `"My Speedster GT is a dream to ride. Thanks for the awesome service!"`, author: "- Mark R." },
          { text: `"Superbikes delivered right to my door with the best packaging!"`, author: "- Emma W." },
        ].map((review, index) => (
          <motion.div key={index} className="review" variants={fadeInUp}>
            <p>{review.text}</p>
            <p>{review.author}</p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default Home;
