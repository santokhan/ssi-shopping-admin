import GoogleMapReact from 'google-map-react';

const PinMarker = ({ pin }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: pin?.x ? `${pin?.x}px` : '50%',
        top: pin?.y ? `${pin?.y}px` : '50%',
        transform: 'translate(-50%, -50%)',
        height: '20px',
        width: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
      }}
      id="pointer1"
    />
  );
};
const GoogleMap = ({ setPosition = ({ lat, lng }) => {}, value }) => {
  const handleMapClick = (newPin) => {
    const { lat, lng } = newPin;
    if (lat || lng) {
      setPosition({ lat, lng });
    }
  };

  return (
    <div
      style={{ width: '100%', height: '50vh' }}
      className="bg-gray-50 relative"
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyBI33ERGnuYC9n-9K5f9gM1Kz0fQ9V8VhQ',
        }}
        center={{
          lat: value.lat || 25.0805,
          lng: value.lng || 55.1403,
        }}
        defaultZoom={10}
        onClick={handleMapClick}
      />
      <PinMarker />
    </div>
  );
};

export default GoogleMap;
