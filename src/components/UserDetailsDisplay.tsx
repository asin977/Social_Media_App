import React from 'react';

import { User } from '../types/user';

type Props = {
  user: User;
};

const UserDetailsDisplay: React.FC<Props> = ({ user }) => (
  <div className={`user-card ${user.status}`}>
    <h3>{user.name}</h3>
    <p>
      <strong>Email:</strong> {user.email}
    </p>
    <p>
      <strong>Gender:</strong> {user.gender}
    </p>
    <p>
      <strong>Status:</strong> {user.status}
    </p>
  </div>
);

export default UserDetailsDisplay;
