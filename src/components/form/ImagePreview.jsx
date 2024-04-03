import RemoveImage from '../action-buttons/RemoveImage';

const ImagePreview = ({ src = "", onRemove }) => {
    return (
        <div className="flex items-end gap-4 rounded-lg text-gray-800">
            <div className="h-24 w-24 sm:h-40 sm:w-40 flex-shrink-0 relative">
                <RemoveImage onRemove={onRemove} />
                <img src={src} alt="" className="w-full h-full object-cover rounded-xl bg-gray-50" />
            </div>
        </div>
    );
};

export default ImagePreview;