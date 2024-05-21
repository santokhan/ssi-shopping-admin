import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Print from '../Print';

const PinMarker = ({ pin }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: pin.x ? `${pin.x}px` : '50%',
        top: pin.y ? `${pin.y}px` : '50%',
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
  // Initialize pin state with dummy coordinates (e.g., Dubai Marina)
  const initialPin = {
    lat: value && value.lat ? parseFloat(value.lat) : 25.0805,
    lng: value && value.lng ? parseFloat(value.lng) : 55.1403,
  };
  const [pin, setPin] = useState(initialPin);

  const handleMapClick = (newPin) => {
    const { lat, lng, x, y } = newPin;
    if (lat || lng) {
      setPin(newPin);
      setPosition(newPin);
    }
  };

  useEffect(() => {
    setPin((prev) => {
      return {
        ...prev,
        lat: parseFloat(value.lat),
        lng: parseFloat(value.lng),
      };
    });
  }, [value]);

  return (
    <>
      <div
        style={{ width: '100%', height: '50vh' }}
        className="bg-gray-50 relative"
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyBI33ERGnuYC9n-9K5f9gM1Kz0fQ9V8VhQ',
          }}
          defaultCenter={initialPin}
          center={pin}
          defaultZoom={10}
          onClick={handleMapClick}
          onGoogleApiLoaded={handleMapClick}
          onChange={handleMapClick}
        />
        <PinMarker pin={pin} />
      </div>
    </>
  );
};

export default GoogleMap;
