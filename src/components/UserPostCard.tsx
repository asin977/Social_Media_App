import React from 'react';

import UserIcon from '../assets/images/user.png';

type UserPostCardProps = {
  title: string;
  body: string;
  userId: number;
};

export const UserPostCard: React.FC<UserPostCardProps> = ({
  title,
  body,
  userId,
}) => {
  return (
    <div
      className="user-details-card"
      style={{
        color: 'black',
        backgroundColor: '#e3f2fd',
        boxShadow: 'rgba(0, 0, 255, 0.2) 0px 2px 6px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%',
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
    >
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          style={{ width: '60px', marginBottom: '10px' }}
          src={UserIcon}
          alt="UserIcon"
        />
      </span>
      <h2
        style={{
          color: 'darkblue',
          margin: '10px 0px',
          fontSize: '18px',
          textAlign: 'justify',
          fontFamily: 'regular',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: 'regular',
          textWrap: 'balance',
          textAlign: 'justify',
        }}
      >
        {body}
      </p>
      <p style={{ color: 'darkred', fontFamily: 'bold' }}>
        Author ID: {userId}
      </p>
    </div>
  );
};
