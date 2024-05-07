import { useContext } from 'react';
import AmenitiesForm from '../../../../blocks/form/projects/AmenitiesForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { ProjectFormContext } from '../../../../context/project-form/ProjectFormContext.jsx';

const ProjectAmenities = ({ type = 'create' }) => {
  const { setFormValue, value, onEdit, onCreate } =
    useContext(ProjectFormContext);
  const thisFormName = 'amenities';

  const amenities = value[thisFormName] || [];

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Select Amenities {type}</PropertiesFormTitle>
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

export default ProjectAmenities;
