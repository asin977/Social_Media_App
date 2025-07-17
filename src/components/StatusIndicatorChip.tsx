import React from 'react';

interface StatusIndicatorChipProps {
  status: 'active' | 'inactive';
}

const StatusIndicatorChip: React.FC<StatusIndicatorChipProps> = ({ status }) => {
  const color = status === 'active' ? 'green' : 'red';
  const label = status === 'active' ? 'Active' : 'Inactive';

  return (
    <span
      title={label} 
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
