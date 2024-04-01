import AmenitiesForm from '../../../../blocks/form/properties/AmenitiesForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';

const Page = () => {
    return (
        <>
            <div className="space-y-4">
                <PropertiesFormTitle>Select Amenities</PropertiesFormTitle>
            </div>
            <AmenitiesForm />
        </>
    );
};

export default Page;