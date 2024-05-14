import { useContext } from 'react';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import QRCodeForm from '../../../../blocks/form/properties/QRCode.jsx';
import { ProjectFormContext } from '../../../../context/project-form/ProjectFormContext.jsx';

const ProjectQRCodeTab = () => {
  const { value, setFormValue } = useContext(ProjectFormContext);

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>QR Code</PropertiesFormTitle>
      </div>
      <QRCodeForm value={value} setValue={setFormValue} />
    </>
  );
};

export default ProjectQRCodeTab;
