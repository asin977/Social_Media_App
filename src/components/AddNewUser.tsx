import React, { useState } from 'react';

import { DataQueryKeys } from '../apis/data-query-keys';
import { UserListAPIResponse } from '../types/user';

import UserImage from '../assets/images/add-user.png';

const AddNewUser = () => {
  const [users, setUsers] = useState<UserListAPIResponse[]>([]);

  const [newUser, setNewUser] = useState<Partial<UserListAPIResponse>>({
    name: '',
    email: '',
    gender: '',
    status: '',
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userToAdd: UserListAPIResponse = {
      id,
      user: newUser.email?.split('@')[0] || '',
      name: newUser.name!,
      email: newUser.email!,
      gender: newUser.gender || 'unspecified',
      status: newUser.status || 'active',
    };

    const updatedUsers = [...users, userToAdd];
    setUsers(updatedUsers);
    localStorage.setItem(
      DataQueryKeys.USER_STORAGE_KEYS,
      JSON.stringify(updatedUsers),
    );
    setNewUser({ name: '', email: '', gender: '', status: '' });
  };

  return (
    <div style={{ paddingBottom: '23px' }}>
      <h2
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#023e8a',
          paddingBottom: '12px',
        }}
      >
        <img
          style={{ width: '40px', height: '40px', marginRight: '12px' }}
          src={UserImage}
          alt="userImage"
        />
        Add New User
      </h2>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
        style={{
          marginRight: '10px',
          padding: '8px',
          fontSize: '18px',
          boxShadow: '0 0 5px rgba(75, 0, 130, 0.4)',
        }}
      />

      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        style={{
          marginRight: '10px',
          padding: '8px',
          fontSize: '18px',
          boxShadow: '0 0 5px rgba(75, 0, 130, 0.4)',
        }}
      />

      <input
        type="text"
        placeholder="Gender"
        value={newUser.gender}
        onChange={e => setNewUser({ ...newUser, gender: e.target.value })}
        style={{
          marginRight: '10px',
          padding: '8px',
          fontSize: '18px',
          boxShadow: '0 0 5px rgba(75, 0, 130, 0.4)',
        }}
      />

      <input
        type="text"
        placeholder="Status"
        value={newUser.status}
        onChange={e => setNewUser({ ...newUser, status: e.target.value })}
        style={{
          marginRight: '10px',
          padding: '8px',
          fontSize: '18px',
          boxShadow: '0 0 5px rgba(75, 0, 130, 0.4)',
        }}
      />
      <button
        onClick={handleAddUser}
        style={{
          border: 'none',
          padding: '8px 20px',
          fontSize: '18px',
          fontWeight: 'bold',
          marginTop: '-21px',
          borderRadius: '3px',
          cursor: 'pointer',
          backgroundColor: '#023e8a',
          color: 'white',
        }}
      >
        Add User
      </button>
    </div>
  );
};

export default AddNewUser;
