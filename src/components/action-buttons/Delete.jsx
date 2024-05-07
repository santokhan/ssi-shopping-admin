import { Trash } from 'iconsax-react';

const ActionDelete = ({ onDelete }) => {
  return (
    <button
      type="button"
      className="font-medium rounded-full text-sm text-center inline-flex items-center hover:text-red-600"
      onClick={onDelete}
    >
      <Trash className="w-5 h-5" />
    </button>
  );
};

export default ActionDelete;
