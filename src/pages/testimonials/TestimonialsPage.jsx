import React, { useContext } from 'react';
import TestimonialsProvider, {
  TestimonialsContext,
} from '../../context/testimonials/TestimonialsContext';
import TestimonidalsTable from './TestimonialsTable';

const Testimonials = () => {
  const { testimonials } = useContext(TestimonialsContext);

  return <TestimonidalsTable testimonials={testimonials} />;
};

const TestimonialsPage = () => {
  return (
    <TestimonialsProvider>
      <Testimonials />
    </TestimonialsProvider>
  );
};

export default TestimonialsPage;
