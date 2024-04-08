import { useForm } from "react-hook-form";
import CancelOrSubmit from "../../../components/form/CancelOrSubmit";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { FinalSubmitButton } from "../../../components/form/SubmitButton";
import { useState } from "react";

const amenities = [
    {
        "id": "attic",
        "name": "Attic"
    },
    {
        "id": "basketball_court",
        "name": "Basketball court"
    },
    {
        "id": "air_conditioning",
        "name": "Air Conditioning"
    },
    {
        "id": "lawn",
        "name": "Lawn"
    },
    {
        "id": "swimming_pool",
        "name": "Swimming Pool"
    },
    {
        "id": "barbeque",
        "name": "Barbeque"
    },
    {
        "id": "microwave",
        "name": "Microwave"
    },
    {
        "id": "tv_cable",
        "name": "TV Cable"
    },
    {
        "id": "dryer",
        "name": "Dryer"
    },
    {
        "id": "outdoor_shower",
        "name": "Outdoor Shower"
    },
    {
        "id": "washer",
        "name": "Washer"
    },
    {
        "id": "ocean_view",
        "name": "Ocean view"
    },
    {
        "id": "private_space",
        "name": "Private space"
    },
    {
        "id": "lake_view",
        "name": "Lake view"
    },
    {
        "id": "wine_cellar",
        "name": "Wine cellar"
    },
    {
        "id": "front_yard",
        "name": "Front yard"
    },
    {
        "id": "refrigerator",
        "name": "Refrigerator"
    },
    {
        "id": "wifi",
        "name": "WiFi"
    },
    {
        "id": "laundry",
        "name": "Laundry"
    },
    {
        "id": "sauna",
        "name": "Sauna"
    }
];

const initialValue = {
    id: "",
    name: ""
}

function CheckBoxContainer({ amenity, onChange, valueObj }) {
    if (!valueObj) {
        valueObj = initialValue
    }

    return (
        <div key={amenity.id} className="flex gap-x-2 items-center">
            <input
                id={amenity.id}
                name={amenity.id} type="checkbox"
                className="h-4 w-4 rounded-lg border-gray-300"
                onChange={onChange}
                value={valueObj.id}
            />
            <label
                htmlFor={amenity.id}
                className="font-medium text-gray-900"
            >{amenity.name}</label>
        </div>
    );
}

const AmenitiesForm = () => {
    // const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate()
    const [formState, setFormState] = useState([])

    const onSubmit = (e) => {
        const formData = new FormData(e.target);

        // store formData to context

        navigate("/properties/create/media")
    };

    return (
        <form className="" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {amenities.map(amenity => (
                    <CheckBoxContainer
                        key={amenity.id}
                        amenity={amenity}
                        onChange={() => {
                            // Check if the amenity already exists in formState based on amenity.id
                            const existingAmenity = formState.find(item => item.id === amenity.id);

                            if (existingAmenity) {
                                // If amenity with the same id already exists, perform filtering
                                const filteredFormState = formState.filter(item => item.id !== amenity.id);
                                setFormState(filteredFormState);
                            } else {
                                // If amenity doesn't exist in formState, add it
                                setFormState([...formState, amenity]);
                            }
                        }}
                        valueObj={formState.find(({ id }) => id === amenity.id)}
                    />
                ))}
            </div>
            <FinalSubmitButton />
            {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}
        </form>
    );
};

export default AmenitiesForm;