// LayoutTestimonials.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import TestimonialsProvider from '../context/testimonials/TestimonialsContext';

const LayoutTestimonials = () => {
  return <Outlet />;
};

export default LayoutTestimonials;
