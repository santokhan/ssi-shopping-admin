import { useContext } from 'react';
import LocationForm from '../../../../blocks/form/properties/LocationForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';

const Page = () => {
  const { storeFormData, formData, setFormValue, value } =
    useContext(PropertyFormContext);
  const thisFormName = 'location';

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
        <PropertiesFormTitle>Location</PropertiesFormTitle>
      </div>
      <LocationForm value={valueFromState} setValue={setValue} />
    </>
  );
};

export default Page;
