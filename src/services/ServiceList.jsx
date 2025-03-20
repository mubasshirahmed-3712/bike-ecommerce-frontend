// ServiceList.js
import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';
import { FaTools, FaMoneyBillWave, FaMotorcycle, FaPaintRoller } from 'react-icons/fa';

const servicesData = [
   {
      icon: <FaMotorcycle size={50} color="orange" />, 
      title: 'Wide Range of Bikes',
      desc: 'Explore a vast selection of high-performance and stylish bikes tailored to every rider.'
   },
   {
      icon: <FaPaintRoller size={50} color="red" />, 
      title: 'Bike Customization',
      desc: 'Modify your bike with unique colors, accessories, and performance upgrades.'
   },
   {
      icon: <FaTools size={50} color="blue" />, 
      title: 'Servicing & Maintenance',
      desc: 'Keep your bike in top condition with our expert servicing and repair solutions.'
   },
   {
      icon: <FaMoneyBillWave size={50} color="green" />, 
      title: 'Easy Financing',
      desc: 'Get flexible financing options to own your dream bike without financial stress.'
   }
];

const ServiceList = () => {
   return (
      <>
         {servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>
         ))}
      </>
   );
};

export default ServiceList;
