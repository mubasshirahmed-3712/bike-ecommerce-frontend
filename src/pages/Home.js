import React from 'react';
import '../styles/Home.css';
import { Container, Row, Col } from 'reactstrap';
import heroVideo1 from '../assets/videos/bike1.mp4';
import heroVideo2 from '../assets/videos/bike2.mp4';
import heroVideo3 from '../assets/videos/bike3.mp4';

const Home = () => {
   return (
      <>
         {/* ========== TAGLINE SECTION ========== */}
         <section className="tagline__section text-center">
            <Container>
               <h1 className="tagline">Fuel Your Passion – The Road Awaits! 🚀🏍️</h1>
            </Container>
         </section>

         {/* ========== HERO SECTION ========== */}
         <section>
            <Container>
               <Row>
                  <Col lg='6'>
                     <div className="hero__content">
                        <div className="hero__subtitle d-flex align-items-center">
                           <h4>Know Before You Ride</h4>
                        </div>
                        <h1>Experience the thrill of the road with <span className='highlight'>the best rides</span></h1>
                        <p>
                           Discover top-tier bikes that redefine speed, style, and adventure.
                           Whether you're a cruiser, racer, or an off-road explorer, we have something for you.
                        </p>
                     </div>
                  </Col>

                  <Col lg='2'>
                     <div className="hero__video-box">
                        <video src={heroVideo1} controls muted autoPlay loop />
                     </div>
                  </Col>
                  <Col lg='2'>
                     <div className="hero__video-box mt-4">
                        <video src={heroVideo2} controls muted autoPlay loop />
                     </div>
                  </Col>
                  <Col lg='2'>
                     <div className="hero__video-box mt-5">
                        <video src={heroVideo3} controls muted autoPlay loop />
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
      </>
   );
};

export default Home;