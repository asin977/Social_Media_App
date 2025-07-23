import React, { useState } from 'react';
import UserIcon from '../assets/images/user.png';
import { UserListAPIResponse } from '../types/user';

type UserDetailsProps = {
  users: UserListAPIResponse[];
  onUserSelect: (user: UserListAPIResponse) => void;
};

export const UserDetailsCard: React.FC<UserDetailsProps> = ({
  users,
  onUserSelect,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <>
      {users.map((user, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            border: '1px solid #ccc',
            padding: '70px',
            borderRadius: '8px',
            width: '100%',
            color: 'darkblue',
            backgroundColor: '#e3f2fd',
            boxShadow: '1px 2px 3px blue',
            opacity: '1',
            transition:
              'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
            WebkitBoxShadow:
              hoveredCard === index
                ? '4px 6px 12px rgba(0, 0, 255, 0.3)'
                : '1px 2px 3px blue',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => onUserSelect(user)}
        >
          <img
            src={UserIcon}
            alt="userIcon"
            style={{
              width: '100px',
              position: 'absolute',
              top: '20px',
              left: '50px',
            }}
          />
          <h3 style={{ margin: '0 0 10px 0', textAlign: 'end' }}>
            {user.name}
          </h3>
          <p style={{ textAlign: 'end' }}>{user.email}</p>
        </div>
      ))}
    </>
  );
};
