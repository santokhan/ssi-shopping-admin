import MediaForm from '../../../../blocks/form/projects/MediaForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';

const ProjectMedia = () => {
  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>Media</PropertiesFormTitle>
      </div>
      <MediaForm />
    </>
  );
};

export default ProjectMedia;
