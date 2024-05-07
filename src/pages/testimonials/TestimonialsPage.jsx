import React, { useContext } from 'react';
import TestimonialsProvider, {
  TestimonialsContext,
} from '../../context/testimonials/TestimonialsContext';
import TestimonidalsTable from './TestimonialsTable';
import Print from '../../components/Print';

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
