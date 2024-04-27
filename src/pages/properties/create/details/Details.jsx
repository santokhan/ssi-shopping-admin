import { useContext } from 'react';
import DetailsForm from '../../../../blocks/form/properties/DetailsForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';

const Page = () => {
  const { storeFormData, formData, setFormValue } =
    useContext(PropertyFormContext);
  const thisFormName = 'details';

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
        <PropertiesFormTitle>Details</PropertiesFormTitle>
      </div>
      <DetailsForm value={valueFromState} setValue={setValue} />
    </>
  );
};

export default Page;
