import { twMerge } from 'tailwind-merge';
import SubmitButton from './SubmitButton';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const PrevAndNext = ({ back }) => {
  const navigate = useNavigate();
  return (
    <div className={twMerge('col-span-full flex justify-between gap-2 mt-4')}>
      <Button
        variant="outline"
        onClick={() => {
          navigate(back);
        }}
      >
        Back
      </Button>
      <SubmitButton type="submit">Next Step</SubmitButton>
    </div>
  );
};

export default PrevAndNext;
