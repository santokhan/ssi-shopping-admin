import { useContext } from 'react';
import AmenitiesForm from '../../../../blocks/form/properties/AmenitiesForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';
import { useNavigate } from 'react-router-dom';

const Page = ({ type = 'create' }) => {
  const { storeFormData, formData, setFormValue, value, onEdit, onCreate } =
    useContext(PropertyFormContext);
  const thisFormName = 'amenities';
  const navigate = useNavigate();

  const amenities = value[thisFormName] || [];

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
        setValue={(id) => {
          let updated = [];
          if (amenities.includes(id)) {
            updated = amenities.filter((e) => e !== id);
          } else {
            updated = [...amenities, id];
          }
          setFormValue(thisFormName, updated);
        }}
        onSubmit={type === 'edit' ? onEdit : onCreate}
      />
    </>
  );
};

export default Page;
