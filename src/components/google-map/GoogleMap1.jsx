import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const PinMarker = ({ lat, lng }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '20px',
      width: '20px',
      backgroundColor: 'red',
      borderRadius: '50%',
    }}
  />
);

const GoogleMap = ({ setPosition = ({ lat, lng }) => {}, value }) => {
  // Initialize pin state with dummy coordinates (e.g., New York City)
  const [pin, setPin] = useState({ lat: 25.0805, lng: 55.1403 });

  const handleMapClick = (newPin) => {
    console.log(newPin);

    const { lat, lng } = newPin;

    if (lat || lng) {
      setPin(newPin);
      setPosition(newPin);
    }
  };

  useEffect(() => {
    if (value?.lat) {
      setPin((prev) => ({ ...prev, lat: parseInt(value.lat) }));
    }
    if (value?.lng) {
      setPin((prev) => ({ ...prev, lng: parseInt(value.lng) }));
    }
  }, [value]);

  return (
    <div style={{ width: '100%', height: '50vh' }} className="bg-gray-50">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyBI33ERGnuYC9n-9K5f9gM1Kz0fQ9V8VhQ',
          // key: 'AIzaSyBOcRW6uzV5cgAgapo9iXMhx8FxJQJEqAo',
        }}
        defaultCenter={{ lat: 25.0805, lng: 55.1403 }}
        defaultZoom={10}
        onClick={handleMapClick}
      >
        <PinMarker lat={pin.lat} lng={pin.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
