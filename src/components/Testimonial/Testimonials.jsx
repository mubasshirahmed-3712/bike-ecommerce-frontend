import React from 'react'
import Slider from 'react-slick'
import rider01 from '../../assets/images2/ava-1.jpg'
import rider02 from '../../assets/images2/ava-2.jpg'
import rider03 from '../../assets/images2/ava-3.jpg'

const Testimonials = () => {
   const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      swipeToSlide: true,
      autoplaySpeed: 3000,
      slidesToShow: 3,

      responsive: [
         {
            breakpoint: 992,
            settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, dots: true }
         },
         {
            breakpoint: 576,
            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true }
         }
      ]
   }

   return (
      <Slider {...settings}>
         {testimonialsData.map((item, index) => (
            <div className="testimonial py-4 px-3" key={index}>
               <p>{item.review}</p>
               <div className='d-flex align-items-center gap-4 mt-3'>
                  <img src={item.img} className='w-25 h-25 rounded-2' alt="Customer" />
                  <div>
                     <h6 className='mb-0 mt-3'>{item.name}</h6>
                     <p>{item.role}</p>
                  </div>
               </div> 
            </div>
         ))}
      </Slider>
   )
}

const testimonialsData = [
   {
      img: rider01,
      name: "Alex Johnson",
      role: "Bike Enthusiast",
      review: "I bought my dream bike from here, and the experience was fantastic! Great customer service and fast delivery."
   },
   {
      img: rider02,
      name: "Sophia Martinez",
      role: "Motorcycle Collector",
      review: "Their customization options are top-notch! My new bike is an absolute beast on the road."
   },
   {
      img: rider03,
      name: "James Brown",
      role: "Daily Rider",
      review: "Reliable and stylish bikes at a great price. I've been using my new bike for months, and it performs flawlessly."
   },
   {
      img: rider03,
      name: "Emma Wilson",
      role: "Adventure Rider",
      review: "Highly recommend! The quality and variety of bikes available here are unmatched."
   }
]

export default Testimonials
