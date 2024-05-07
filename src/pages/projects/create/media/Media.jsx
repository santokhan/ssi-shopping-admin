import { useContext } from 'react';
import MediaForm from '../../../../blocks/form/projects/MediaForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { ProjectFormContext } from '../../../../context/project-form/ProjectFormContext.jsx';

const ProjectMedia = () => {
  const { setFormValue, value } = useContext(ProjectFormContext);

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Media</PropertiesFormTitle>
      </div>
      <MediaForm value={value} setValue={setFormValue} />
    </>
  );
};

export default ProjectMedia;
