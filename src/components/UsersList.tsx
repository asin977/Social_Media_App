import React, { useState, useEffect } from 'react';

import { DataQueryKeys } from '../apis/data-query-keys';
import { useGetUserDetails } from '../apis/user/useGetUserDetails';
import { UserListAPIResponse } from '../types/user';

const USER_STORAGE_KEY = 'persisted_users';

const UserList: React.FC = () => {
  const { data: fetchedUsers, isLoading, isError, error } = useGetUserDetails();

  const [users, setUsers] = useState<UserListAPIResponse[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>('');
};

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
      {Users.map(user => (
        <div key={user.id}>
            
          <h3
            style={{
              color: 'darkblue',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {editingUserId === user.id ? (
              <input
                type="text"
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
                placeholder={DataQueryKeys.NAME_PLACEHOLDER}
                style={{
                  border: 'none',
                  padding: '10px 25px',
                  fontSize: '18px',
                  boxShadow: '0 0 5px rgba(75, 0, 130, 0.4)',
                }}
              />
            ) : (
              <>👤 {user.name}</>
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
        </div>
      ))}
    </div>
  );
};

export default UserList;
