import MediaForm from '../../../../blocks/form/properties/MediaForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';

const Page = () => {
    return (
        <>
            <div className="space-y-4">
                <PropertiesFormTitle>Media</PropertiesFormTitle>
            </div>
            <MediaForm />
        </>
    );
};

export default Page;