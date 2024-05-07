import { useContext } from 'react';
import MediaForm from '../../../../blocks/form/properties/MediaForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';

const Page = () => {
  const { setFormValue, value } = useContext(PropertyFormContext);

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Media</PropertiesFormTitle>
      </div>
      <MediaForm value={value} setValue={setFormValue} />
    </>
  );
};

export default Page;
