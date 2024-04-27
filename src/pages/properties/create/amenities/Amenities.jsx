import { useContext } from 'react';
import AmenitiesForm from '../../../../blocks/form/properties/AmenitiesForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';

const Page = () => {
  const { storeFormData, formData, setFormValue, value } =
    useContext(PropertyFormContext);
  const thisFormName = 'amenities';

  const valueFromState = formData[thisFormName];

  function setValue(value) {
    if (Array.isArray(value)) {
      storeFormData(thisFormName, value);
    } else {
      throw new Error('value must be an array');
    }
  }

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Select Amenities</PropertiesFormTitle>
      </div>
      <AmenitiesForm
        value={value[thisFormName] || []}
        setValue={setFormValue}
      />
    </>
  );
};

export default Page;
