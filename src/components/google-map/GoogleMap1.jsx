import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const PinMarker = ({ pin }) => {
  useEffect(() => {
    console.log(pin);
  }, [pin]);

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
  const [pin, setPin] = useState({ lat: 25.0805, lng: 55.1403 });

  const handleMapClick = (newPin) => {
    const { lat, lng, x, y } = newPin;
    if (lat || lng) {
      setPin(newPin);
      setPosition(newPin);
    }
  };

  // useEffect(() => {
  //   console.log(pin);
  // }, [pin]);

  useEffect(() => {
    if (value?.lat) {
      setPin((prev) => ({ ...prev, lat: parseInt(value.lat) }));
    }
    if (value?.lng) {
      setPin((prev) => ({ ...prev, lng: parseInt(value.lng) }));
    }
  }, [value]);

  return (
    <div
      style={{ width: '100%', height: '50vh' }}
      className="bg-gray-50 relative"
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyBI33ERGnuYC9n-9K5f9gM1Kz0fQ9V8VhQ',
          // key: 'AIzaSyBOcRW6uzV5cgAgapo9iXMhx8FxJQJEqAo',
        }}
        defaultCenter={{ lat: 25.0805, lng: 55.1403 }}
        defaultZoom={10}
        onClick={handleMapClick}
      >
        <></>
      </GoogleMapReact>
      <PinMarker pin={pin} key={crypto.randomUUID()} />
    </div>
  );
};

export default GoogleMap;
