import React from 'react';
import { Link } from 'react-router-dom';

function BackAnchor({ to = '/' }) {
  return (
    <Link
      to={to}
      className="text-gray-500 hover:text-gray-900 font-medium rounded-full text-sm inline-flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 rotate-180"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <span className="sr-only">Icon description</span>
    </Link>
  );
}

export default BackAnchor;
