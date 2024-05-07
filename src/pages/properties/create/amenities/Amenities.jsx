import { useContext } from 'react';
import AmenitiesForm from '../../../../blocks/form/properties/AmenitiesForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';
import Print from '../../../../components/Print.jsx';

const Page = ({ type = 'create' }) => {
  const { setFormValue, value, onEdit, onCreate } =
    useContext(PropertyFormContext);
  const thisFormName = 'amenities';

  const amenities = value[thisFormName] || [];

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Select Amenities {type}</PropertiesFormTitle>
      </div>
      <AmenitiesForm
        value={amenities}
        setValue={(updated) => {
          setFormValue(thisFormName, updated);
        }}
        onSubmit={type === 'edit' ? onEdit : onCreate}
      />
    </>
  );
};

export default Page;
