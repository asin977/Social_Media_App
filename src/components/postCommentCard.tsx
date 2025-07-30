import React from 'react';

import User from '../assets/images/commentuser.png';
import { AddCommentPayload } from '../types/comments';

export const PostCommentCard: React.FC<AddCommentPayload> = ({
  name,
  email,
  body,
}) => {
  return (
    <div
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
          <h3
            style={{
              fontSize: '16px',
              margin: '0',
              fontWeight: 'bold',
            }}
          >
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
        </div>
      </div>
      <p style={{ marginTop: '10px', color: 'black' }}>{body}</p>
    </div>
  );
};
