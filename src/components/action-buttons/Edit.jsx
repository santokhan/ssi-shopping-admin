import { Edit } from "iconsax-react";

const ActionEdit = ({ onEdit }) => {
    return (
        <button type="button" className="font-medium rounded-full text-sm text-center inline-flex items-center hover:text-green-600" onClick={onEdit}>
            <Edit className="w-5 h-5" />
        </button>
    );
}

export default ActionEdit;