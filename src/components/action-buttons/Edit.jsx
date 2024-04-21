import { Edit } from 'iconsax-react';
import { Link } from 'react-router-dom';

const ActionEdit = ({ onEdit = () => {}, to }) => {
  return (
    <Link
      to={to}
      className="font-medium rounded-full text-sm text-center inline-flex items-center hover:text-green-600"
      onClick={(e) => {}}
    >
      <Edit className="w-5 h-5" />
    </Link>
  );
};

export default ActionEdit;
