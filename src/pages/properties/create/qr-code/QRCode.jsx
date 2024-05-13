import { useContext } from 'react';
import DetailsForm from '../../../../blocks/form/properties/DetailsForm.jsx';
import PropertiesFormTitle from '../../../../components/form/PropertiesFormTitle.jsx';
import { PropertyFormContext } from '../../../../context/properties-form-context/create-properties-context.jsx';
import QRCodeForm from '../../../../blocks/form/properties/QRCode.jsx';

const QRCodeTab = () => {
  const { setFormValue, value } = useContext(PropertyFormContext);

  return (
    <>
      <div className="space-y-4">
        <PropertiesFormTitle>QR Code</PropertiesFormTitle>
      </div>
      <QRCodeForm value={value} setValue={setFormValue} />
    </>
  );
};

export default QRCodeTab;
