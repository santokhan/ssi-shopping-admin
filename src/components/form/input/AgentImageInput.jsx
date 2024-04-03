import { useRef, useState } from "react";
import Button from "../../Button";
import RemoveImage from "../../action-buttons/RemoveImage";

const PreviewImage = ({ src }) => {
    return (
        <img
            src={src}
            alt="agent-image-input"
            className="w-full h-full object-cover rounded-xl"
        />
    );
}

const AgentImageInput = ({ agentPhoto = null }) => {
    const [image, setImage] = useState(agentPhoto);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
        // Your file upload handling logic here
        console.log(event.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="flex items-end gap-4 rounded-lg text-gray-800">
            <div className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 relative bg-gray-50 rounded-xl border">
                <RemoveImage />
                {agentPhoto && <PreviewImage src={agentPhoto} />}
                {image && <PreviewImage src={URL.createObjectURL(image)} />}
            </div>
            <div className='space-y-2'>
                <div>
                    <Button onClick={handleButtonClick} variant="outline" withIcon={true}>Upload Profile</Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".png,.jpg,.jpeg,.webp,.giff"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <p>{"Photos must be JPEG or PNG format and least 2048x2048"}</p>
            </div>
        </div>
    )
}

export default AgentImageInput