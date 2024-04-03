import React from 'react';

const GoogleMapInput = () => {
  return (
    <iframe
      className="w-full aspect-[2/1] rounded-xl"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14567.698050353962!2d-82.65642607462016!3d27.523815057253127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c3174bbe882fe7%3A0x9b8502ec0327f6ec!2sDe%20Soto%20National%20Memorial%20-%20Visitor%20Center!5e0!3m2!1sen!2sbd!4v1712156834326!5m2!1sen!2sbd"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default GoogleMapInput;
