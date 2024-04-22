import { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const PinMarker = ({ lat, lng }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translate(-50%, -50%)',
      height: '20px',
      width: '20px',
      backgroundColor: 'red',
      borderRadius: '50%',
    }}
  />
);

const GoogleMap = ({ setPosition = () => {} }) => {
  // Initialize pin state with dummy coordinates (e.g., New York City)
  const [pin, setPin] = useState({ lat: 40.7128, lng: -74.006 });

  const handleMapClick = ({ lat, lng }) => {
    const newPin = { lat, lng };
    setPin(newPin);
    setPosition(newPin);
    console.log({ Latitude: lat, Longitude: lng });
  };

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBI33ERGnuYC9n-9K5f9gM1Kz0fQ9V8VhQ' }}
        defaultCenter={{ lat: pin.lat, lng: pin.lng }}
        defaultZoom={10}
        onClick={handleMapClick}
      >
        {pin && <PinMarker lat={pin.lat} lng={pin.lng} />}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
