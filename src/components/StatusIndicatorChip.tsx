import React from 'react';

const StatusIndicatorChip: React.FC<{ status: 'active' | 'inactive' }> = ({status}) => {
  const color = status === 'active' ? 'green' : 'red';

  return (
    <span
      style={{
        display: 'inline-block',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: color,
        cursor: 'pointer',
      }}
    />
  );
};

export default StatusIndicatorChip;
