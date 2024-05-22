import React from 'react';
import TH from './TH';
import { twMerge } from 'tailwind-merge';

const THead = ({ className = '', children }) => {
  return (
    <thead
      className={twMerge(
        'bg-gray-100 text-xs font-semibold uppercase text-gray-700',
        className || '',
      )}
    >
      {children}
    </thead>
  );
};

export const THeadList = ({ headList, className = '' }) => {
  return (
    <tr>
      {headList.map((head, i) => {
        return (
          <TH
            key={i}
            className={twMerge(
              className,
              i == 0 ? 'rounded-l' : '',
              i == headList.length - 1 ? 'rounded-r' : '',
            )}
          >
            {head}
          </TH>
        );
      })}
    </tr>
  );
};

export default THead;
