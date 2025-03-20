import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images2/ava-1.jpg'
import ava02 from '../../assets/images2/ava-2.jpg'
import ava03 from '../../assets/images2/ava-3.jpg'

const Testimonials = () => {
   const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      swipeToSlide: true,
      autoplaySpeed: 2000,
      slidesToShow: 3,

      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         },
      ],
   }

   return (
      <Slider {...settings}>
         <div className="testimonial py-4 px-3">
            <p>
               "Absolutely love my new bike! The quality is top-notch, and the ride is super smooth. 
               Customer service was also fantastic – they helped me pick the perfect model!"
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
               <img src={ava01} className='w-25 h-25 rounded-2' alt="Customer 1" />
               <div>
                  <h6 className='mb-0 mt-3'>Michael Johnson</h6>
                  <p>Verified Buyer</p>
               </div>
            </div>
         </div>

         <div className="testimonial py-4 px-3">
            <p>
               "I was hesitant to buy a bike online, but this store exceeded my expectations. 
               The detailed specifications helped me a lot, and the shipping was super fast!"
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
               <img src={ava02} className='w-25 h-25 rounded-2' alt="Customer 2" />
               <div>
                  <h6 className='mb-0 mt-3'>Sophia Carter</h6>
                  <p>Happy Customer</p>
               </div>
            </div>
         </div>

         <div className="testimonial py-4 px-3">
            <p>
               "Best purchase I’ve made this year! The bike is stylish, lightweight, and rides 
               beautifully. Highly recommend this store to any bike enthusiast!"
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
               <img src={ava03} className='w-25 h-25 rounded-2' alt="Customer 3" />
               <div>
                  <h6 className='mb-0 mt-3'>Daniel Smith</h6>
                  <p>Bike Lover</p>
               </div>
            </div>
         </div>

         <div className="testimonial py-4 px-3">
            <p>
               "The customization options are incredible! I got exactly what I wanted, and it feels 
               like a premium bike. Worth every penny!"
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
               <img src={ava01} className='w-25 h-25 rounded-2' alt="Customer 4" />
               <div>
                  <h6 className='mb-0 mt-3'>Emily Davis</h6>
                  <p>Custom Bike Buyer</p>
               </div>
            </div>
         </div>
      </Slider>
   )
}

export default Testimonials
