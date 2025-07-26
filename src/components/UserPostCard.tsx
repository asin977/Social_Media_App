import React from 'react';
import UserIcon from '../assets/images/user.png';

type UserPostCardProps = {
  title: string;
  body: string;
  user_id: number;
};

export const UserPostCard: React.FC<UserPostCardProps> = ({
  title,
  body,
  user_id,
}) => {
  return (
    <div
      style={{
        color: 'black',
        backgroundColor: '#e3f2fd',
        boxShadow: 'rgba(0, 0, 255, 0.2) 0px 2px 6px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        borderRadius: '10px',
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
          fontWeight: 'bold',
          fontFamily: 'bold',
          textAlign: 'justify',
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
        Author ID: {user_id}
      </p>
    </div>
  );
};
