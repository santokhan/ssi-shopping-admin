import { useContext } from 'react';
import DescriptionForm from '../../../../blocks/form/properties/DescriptionForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';

const Page = () => {
  const { storeFormData, formData } = useContext(PropertyFormContext);
  const thisFormName = 'description';

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
        <PropertiesFormTitle>Description</PropertiesFormTitle>
      </div>
      <DescriptionForm value={valueFromState} setValue={setValue} />
    </>
  );
};

export default Page;
