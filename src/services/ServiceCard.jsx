import React from 'react';
import { FaMotorcycle, FaPaintRoller, FaTools, FaMoneyBillWave } from 'react-icons/fa';
import './service-card.css';

const icons = {
   'Wide Range of Bikes': <FaMotorcycle size={40} />,
   'Bike Customization': <FaPaintRoller size={40} />,
   'Servicing & Maintenance': <FaTools size={40} />,
   'Easy Financing': <FaMoneyBillWave size={40} />,
};

const ServiceCard = ({ item }) => {
   const { title, desc } = item;

   return (
      <div className='service__item'>
         <div className="service__icon">
            {icons[title] || <FaMotorcycle size={40} />}  
         </div>
         <h6>{title}</h6>
         <p>{desc}</p>
      </div>
   );
};

export default ServiceCard;
