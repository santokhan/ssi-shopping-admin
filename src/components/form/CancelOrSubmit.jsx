import { twMerge } from 'tailwind-merge';
import SubmitButton from './SubmitButton';
import Button from '../Button';

const PrevAndNext = ({ onNext = () => {}, onBack = () => {} }) => {
  return (
    <div className={twMerge('col-span-full flex justify-between gap-2 mt-4')}>
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      <SubmitButton type="submit">Next Step</SubmitButton>
    </div>
  );
};

export default PrevAndNext;
