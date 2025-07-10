import React from 'react';

import { User } from '../types/user';

type Props = {
  user: User;
};

const UserProfile: React.FC<Props> = ({ user }) => (
  <div
    style={{
      border: '1px solid darkblue',
      boxShadow: '3px 3px 3px #353535',
    }}
    className={`user-card ${user.status}`}
  >
    <h3 style={{ color: 'darkblue', fontFamily: 'bold' }}>{user.name}</h3>

    <p style={{ color: 'blue', fontFamily: 'regualar' }}>
      <strong>Email:</strong> {user.email}
    </p>

    <p style={{ color: '#353535' }}>
      <strong>Gender:</strong> {user.gender}
    </p>

    <p style={{ color: '#d90429' }}>
      <strong>Status:</strong> {user.status}
    </p>
  </div>
);

export default UserProfile;
