import React from 'react';
import '../styles/Home.css';
import { Container, Row, Col } from 'reactstrap';
import heroVideo1 from '../assets/images2/bike-video1.mp4';
import heroVideo2 from '../assets/images2/bike-video2.mp4';
import heroVideo3 from '../assets/images2/bike-video4.mp4';
import Subtitle from '../shared/subtitle.jsx'
import worldImg from '../assets/images2/world.png'
import ServiceList from '../services/ServiceList.jsx'




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
                        <Subtitle subtitle={'Know Before You Ride'} />
                        <img src={worldImg} alt="" />
                     </div>
                     <h1>Experience the thrill of the road with <span className='highlight'>the best rides</span></h1>

                     <p>
                           Discover top-tier bikes that redefine speed, style, and adventure.
                           Whether you're a cruiser, racer, or an off-road explorer, we have something for you.
                        </p>
                  </div>
               </Col>

               <Col lg='2'>
                  <div className="hero__img-box hero__video-box">
                  <video src={heroVideo1} controls muted autoPlay loop />
                  </div>
               </Col>
               <Col lg='2'>
                  <div className="hero__img-box hero__video-box mt-4">
                  <video src={heroVideo2} controls muted autoPlay loop />
                  </div>
               </Col>
               <Col lg='2'>
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
               <Col lg='3'>
                  <h5 className="services__subtitle">What we serve</h5>
                  <h2 className="services__title">We offer our best services</h2>
               </Col>
               <ServiceList />
            </Row>
         </Container>
      </section>
      </>
   );
};

export default Home;