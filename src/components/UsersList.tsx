import React, { useState, useEffect } from 'react';

import { DataQueryKeys } from '../apis/data-query-keys';
import { useGetUserDetails } from '../apis/user';
import { UserListAPIResponse } from '../types/user';

const USER_STORAGE_KEY = 'persisted_users';

const UserList: React.FC = () => {
  const { data: fetchedUsers, isLoading, isError, error } = useGetUserDetails();

  const [users, setUsers] = useState<UserListAPIResponse[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const [newUser, setNewUser] = useState<Partial<UserListAPIResponse>>({
    name: '',
    email: '',
    gender: '',
    status: '',
  });

  const showModal = (message: string) => {
    setModalMessage(message);
    setTimeout(() => setModalMessage(null), 3000);
  };

  useEffect(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      setUsers(JSON.parse(stored));
    } else if (fetchedUsers) {
      setUsers(fetchedUsers);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fetchedUsers));
    }
  }, [fetchedUsers]);

  const handleEdit = (id: number, currentName: string) => {
    setEditingUserId(id);
    setEditedName(currentName);
  };

  const handleSave = (id: number) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, name: editedName } : user,
    );
    setUsers(updatedUsers);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
    setEditingUserId(null);
    setEditedName('');
    showModal('✏️ Changes saved!');
  };

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
    showModal('User deleted.');
  };

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
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
    setNewUser({ name: '', email: '', gender: '', status: '' });
    showModal('User added successfully!');
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        textAlign: 'justify',
        marginLeft: '200px',
        gap: '20px',
        marginTop: '50px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Modal Display */}
      {modalMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#023e8a',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
            fontSize: '16px',
            fontWeight: 'bold',
            zIndex: 1000,
          }}
        >
          {modalMessage}
        </div>
      )}

      {/* Existing Users */}
      {users.map(user => (
        <div key={user.id}>
          <h3 style={{ color: 'darkblue', fontWeight: 'bold' }}>
            👤{' '}
            {editingUserId === user.id ? (
              <input
                type="text"
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
                placeholder={DataQueryKeys.NAME_PLACEHOLDER}
                style={{
                  marginLeft: '10px',
                  border: 'none',
                  padding: '10px 25px',
                  fontSize: '18px',
                  boxShadow: '0 0 5px rgba(75, 0, 130, 0.4)',
                }}
              />
            ) : (
              user.name
            )}
          </h3>

          <div>
            {editingUserId === user.id ? (
              <button
                onClick={() => handleSave(user.id)}
                style={{
                  position: 'absolute',
                  right: '15%',
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
                {DataQueryKeys.SAVE}
              </button>
            ) : (
              <button
                onClick={() => handleEdit(user.id, user.name)}
                style={{
                  position: 'absolute',
                  right: '15%',
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
                {DataQueryKeys.EDIT} 📝
              </button>
            )}
            <button
              onClick={() => handleDelete(user.id)}
              style={{
                backgroundColor: '#023e8a',
                color: 'white',
                marginLeft: '10px',
                position: 'absolute',
                right: '9%',
                border: 'none',
                padding: '8px 20px',
                fontSize: '18px',
                fontWeight: 'bold',
                marginTop: '-21px',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              {DataQueryKeys.DELETE}
            </button>
          </div>

          <p
            style={{
              color: 'black',
              borderBottom: '1px solid lightgray',
              width: '90%',
              paddingBottom: '20px',
              marginTop: '10px',
            }}
          >
            {user.email}
          </p>
        </div>
      ))}

      {/* Add New User Section */}
      <div style={{ paddingBottom: '20px' }}>
        <h2 style={{ color: '#023e8a' }}>➕ Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={e => setNewUser({ ...newUser, name: e.target.value })}
          style={{ marginRight: '10px', padding: '8px', fontSize: '18px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          style={{ marginRight: '10px', padding: '8px', fontSize: '18px' }}
        />
        <input
          type="text"
          placeholder="Gender"
          value={newUser.gender}
          onChange={e => setNewUser({ ...newUser, gender: e.target.value })}
          style={{ marginRight: '10px', padding: '8px', fontSize: '18px' }}
        />
        <input
          type="text"
          placeholder="Status"
          value={newUser.status}
          onChange={e => setNewUser({ ...newUser, status: e.target.value })}
          style={{ marginRight: '10px', padding: '8px', fontSize: '18px' }}
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
    </div>
  );
};

export default UserList;
