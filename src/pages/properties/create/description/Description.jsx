import DescriptionForm from '../../../../blocks/form/properties/DescriptionForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';

const Page = () => {
    return (
        <>
            <div className="space-y-4">
                <PropertiesFormTitle>Description</PropertiesFormTitle>
            </div>
            <DescriptionForm />
        </>
    );
};

export default Page;