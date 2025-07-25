import React from 'react';

interface StatusIndicatorChipProps {
  status: boolean;
}

const StatusIndicatorChip: React.FC<StatusIndicatorChipProps> = ({
  status,
}) => {
  const color = status ? 'green' : 'red';
  const label = status ? 'Active' : 'Inactive';

  return (
    <span
      aria-label={label}
      role="status"
      style={{
        display: 'inline-block',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: color,
        cursor: 'default',
      }}
    />
  );
};

export default StatusIndicatorChip;
