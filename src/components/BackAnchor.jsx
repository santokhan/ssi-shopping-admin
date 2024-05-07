import { ArrowCircleDown, ArrowCircleLeft, ArrowLeft } from 'iconsax-react';
import React from 'react';
import { Link } from 'react-router-dom';

function BackAnchor({ to = '/' }) {
  return (
    <Link
      to={to}
      className="text-gray-500 hover:text-gray-900 font-medium rounded-full text-sm inline-flex items-center"
    >
      <ArrowLeft className="size-5" />
    </Link>
  );
}

export default BackAnchor;
