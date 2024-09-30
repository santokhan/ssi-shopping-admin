import React from 'react';
import { getPasswordWarnings } from '../../../utils/pattern';

const PasswordWarnings = ({ password }) => {
  const warnings = getPasswordWarnings(password);

  if (typeof password === 'string' && password.length > 0) {
    return (
      <ul className="list-disc ml-5">
        {warnings?.map((warning) => (
          <li key={warning} className="text-orange-500 text-sm">
            {warning}
          </li>
        ))}
      </ul>
    );
  }
};

export default PasswordWarnings;
