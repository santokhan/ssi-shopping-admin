import { useContext } from 'react';
import DescriptionForm from '../../../../blocks/form/projects/DescriptionForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { ProjectFormContext } from '../../../../context/project-form/ProjectFormContext.jsx';

const ProjectDesc = () => {
  const { setFormValue, value } = useContext(ProjectFormContext);

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Description</PropertiesFormTitle>
      </div>
      <DescriptionForm value={value} setValue={setFormValue} />
    </>
  );
};

export default ProjectDesc;
