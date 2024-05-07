import { useContext } from 'react';
import LocationForm from '../../../../blocks/form/projects/LocationForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { ProjectFormContext } from '../../../../context/project-form/ProjectFormContext.jsx';

const ProjectLocation = () => {
  const { setFormValue, value } = useContext(ProjectFormContext);

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Location</PropertiesFormTitle>
      </div>
      <LocationForm value={value} setValue={setFormValue} />
    </>
  );
};

export default ProjectLocation;
