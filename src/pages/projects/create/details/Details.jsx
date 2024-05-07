import { useContext } from 'react';
import DetailsForm from '../../../../blocks/form/projects/DetailsForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { ProjectFormContext } from '../../../../context/project-form/ProjectFormContext.jsx';

const ProjectDetails = () => {
  const { setFormValue, value } = useContext(ProjectFormContext);
  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Details</PropertiesFormTitle>
      </div>
      <DetailsForm value={value} setValue={setFormValue} />
    </>
  );
};

export default ProjectDetails;
