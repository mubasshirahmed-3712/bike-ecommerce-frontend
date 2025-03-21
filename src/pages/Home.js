import React from "react";
import "../styles/Home.css";
import { Container, Row, Col } from "reactstrap";
import heroVideo1 from "../assets/images2/bike-video1.mp4";
import heroVideo2 from "../assets/images2/bike-video3.mp4";
import heroVideo3 from "../assets/images2/bike-video4.mp4";
import Subtitle from "../shared/subtitle.jsx";
import worldImg from "../assets/images2/world.png";
import ServiceList from "../services/ServiceList.jsx";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery.jsx";
import Testimonials from "../components/Testimonial/Testimonials.jsx";

const Home = () => {
  return (
    <>
      <div className="home-container">
        {/* ========== TAGLINE SECTION ========== */}
        <section className="tagline__section text-center">
          <Container>
            <h1 className="tagline">
              <span className="tg-fuel">Fuel Your <span className="tgspn">Passion</span></span> <br/>~~~The Road
              Awaits! 🚀🏍️💨
            </h1>
          </Container>
        </section>

        {/* ========== HERO SECTION ========== */}
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <div className="hero__content">
                  <div className="hero__subtitle d-flex align-items-center">
                    <Subtitle subtitle={"Know Before You Ride"} />
                    <img src={worldImg} alt="" />
                  </div>
                  <h1>
                    Experience the thrill of the road with{" "}
                    <span className="highlight">the best rides</span>
                  </h1>

                  <p>
                    Discover top-tier bikes that redefine speed, style, and
                    adventure. Whether you're a cruiser, racer, or an off-road
                    explorer, we have something for you.
                  </p>
                </div>
              </Col>

              <Col lg="2">
                <div className="hero__img-box hero__video-box">
                  <video src={heroVideo1} controls muted autoPlay loop />
                </div>
              </Col>
              <Col lg="2">
                <div className="hero__img-box hero__video-box mt-4">
                  <video src={heroVideo2} controls muted autoPlay loop />
                </div>
              </Col>
              <Col lg="2">
                <div className="hero__img-box hero__video-box mt-5">
                  <video src={heroVideo3} controls muted autoPlay loop />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* ============================================================== */}

        {/* ==================== HERO SECTION START ====================== */}
        <section>
          <Container>
            <Row>
              <Col lg="3">
                <h5 className="services__subtitle">What we serve</h5>
                <h2 className="services__title">We offer our best services</h2>
              </Col>
              <ServiceList />
            </Row>
          </Container>
        </section>

        {/* ========== EXPERIENCE SECTION START ============ */}
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <div className="experience__content">
                  <Subtitle subtitle={"Our Expertise"} />
                  <h2>
                    Years of Passion, <br /> Thousands of Happy Riders
                  </h2>
                  <p>
                    With years of experience in the motorcycle industry, we are
                    committed to delivering the best bikes, top-notch
                    customization, and excellent after-sales service.
                    <br /> Join thousands of riders who trust us for their dream
                    ride.
                  </p>
                </div>

                <div className="counter__wrapper d-flex align-items-center gap-5">
                  <div className="counter__box">
                    <span>20k+</span>
                    <h6>Bikes Sold</h6>
                  </div>
                  <div className="counter__box">
                    <span>5k+</span>
                    <h6>Happy Customers</h6>
                  </div>
                  <div className="counter__box">
                    <span>10+</span>
                    <h6>Years in Business</h6>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* ========== EXPERIENCE SECTION END ============== */}

        {/* ========== TESTIMONIAL SECTION START ================ */}
        <section className="adujstment">
          <Container>
            <Row>
              <Col lg="12">
                <Subtitle subtitle={"Riders Love"} />
                <h2 className="testimonial__title">
                  What Our Customers Say About Us
                </h2>
              </Col>
              <Col lg="12">
                <Testimonials />
              </Col>
            </Row>
          </Container>
        </section>
        {/* ========== TESTIMONIAL SECTION END ================== */}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <hr />
      {/* ========== GALLERY SECTION START ============== */}
      <section className="gallerysect gallcon">
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">Explore Our Customers' Rides</h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== GALLERY SECTION END ================ */}
    </>
  );
};

export default Home;