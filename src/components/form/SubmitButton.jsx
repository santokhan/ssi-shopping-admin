import { twMerge } from 'tailwind-merge';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

export const FinalSubmitButton = ({ back }) => {
  const navigate = useNavigate();
  return (
    <div className={twMerge('col-span-full flex justify-between gap-2 mt-4')}>
      <Button variant="outline" onClick={() => navigate(back)}>
        Back
      </Button>
      <SubmitButton type="submit" />
    </div>
  );
};

const SubmitButton = ({ children, ...props }) => {
  return (
    <Button
      withIcon={true}
      {...props}
      className="w-full text-white font-bold py-2 px-4 rounded"
    >
      {children || 'Submit'}
    </Button>
  );
};

export default SubmitButton;
