import { twMerge } from 'tailwind-merge';
import Button from '../Button';

export const FinalSubmitButton = ({ onBack = () => {} }) => {
  return (
    <div className={twMerge('col-span-full flex justify-between gap-2 mt-4')}>
      <Button variant="outline" onClick={onBack}>
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
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
    >
      {children || 'Submit'}
    </Button>
  );
};

export default SubmitButton;
