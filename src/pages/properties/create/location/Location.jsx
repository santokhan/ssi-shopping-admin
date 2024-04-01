import LocationForm from '../../../../blocks/form/properties/LocationForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';

const Page = () => {
    return (
        <>
           <div className="space-y-4">
                <PropertiesFormTitle>Location</PropertiesFormTitle>
            </div>
            <LocationForm />
        </>
    );
};

export default Page;