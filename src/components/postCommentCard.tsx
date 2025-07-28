import React from 'react';

import User from '../assets/images/commentuser.png';

type PostCommentCardProps = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  id,
  postId,
  name,
  email,
  body,
}) => {
  return (
    <div
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
      }}
    >
      <div
        key={id}
        style={{
          color: 'darkblue',
          padding: '20px',
          borderBottom: '1px solid lightgray',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={User}
            alt="user"
            style={{ width: '30px', marginRight: '10px' }}
          />
          <div>
            <h3 style={{ fontSize: '16px', margin: '0', fontWeight: 'bold' }}>
              {name}
            </h3>
            <h4
              style={{
                margin: '0',
                color: 'gray',
                fontSize: '14px',
                fontWeight: 'normal',
                marginTop: '12px',
              }}
            >
              {email}
            </h4>
            <p style={{ marginTop: '10px', color: 'black' }}>{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
