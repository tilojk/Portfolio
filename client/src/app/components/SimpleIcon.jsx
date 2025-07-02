import React from 'react';

const SimpleIcon = ({ icon, size }) => {
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={`#F9FAFB`}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};

export default SimpleIcon;