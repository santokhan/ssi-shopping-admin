const StatusIndicator = ({ status }) => {
  if (!status) {
    return null;
  }

  let backgroundColor, textColor, labelText;

  switch (status.toLowerCase()) {
    case 'active':
      backgroundColor = 'bg-green-100';
      textColor = 'text-green-600';
      labelText = 'Active';
      break;
    case 'inactive':
      backgroundColor = 'bg-red-100';
      textColor = 'text-red-600';
      labelText = 'Inactive';
      break;
    default:
      backgroundColor = 'bg-gray-100';
      textColor = 'text-gray-600';
      labelText = 'Unknown';
  }

  return (
    <span
      className={`inline-flex justify-center rounded-full px-4 py-2 text-sm ${backgroundColor} ${textColor} hover:bg-${status}-200`}
    >
      {labelText}
    </span>
  );
};

export default StatusIndicator;
