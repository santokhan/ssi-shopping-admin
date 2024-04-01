import DetailsForm from '../../../../blocks/form/properties/DetailsForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';

const Page = () => {
    return (
        <>
          <div className="space-y-4">
                <PropertiesFormTitle>Details</PropertiesFormTitle>
            </div>
            <DetailsForm />
        </>
    );
};

export default Page;