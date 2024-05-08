import React, { useContext } from 'react';
import TestimonialsProvider, {
  TestimonialsContext,
} from '../../context/testimonials/TestimonialsContext';
import TestimonidalsTable from './TestimonialsTable';

const Testimonials = () => {
  const { testimonials, refetch } = useContext(TestimonialsContext);

  return <TestimonidalsTable testimonials={testimonials} refetch={refetch} />;
};

const TestimonialsPage = () => {
  return (
    <TestimonialsProvider>
      <Testimonials />
    </TestimonialsProvider>
  );
};

export default TestimonialsPage;
