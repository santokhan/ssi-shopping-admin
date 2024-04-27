import { useContext } from 'react';
import MediaForm from '../../../../blocks/form/properties/MediaForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';

const Page = () => {
  const { storeFormData, formData, setFormValue, value } =
    useContext(PropertyFormContext);
  const thisFormName = 'media';

  const valueFromState = formData[thisFormName];

  function setValue(key, value) {
    if (key === '') return;

    const newState = {
      ...valueFromState,
      [key.trim()]: value,
    };
    storeFormData(thisFormName, newState);
  }

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Media</PropertiesFormTitle>
      </div>
      <MediaForm value={valueFromState} setValue={setValue} />
    </>
  );
};

export default Page;
