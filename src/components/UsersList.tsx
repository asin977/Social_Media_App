import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserDetails } from '../apis/user/useGetUserList';
import { useUpdateUserDetails } from '../apis/user/useUpdateUserDetails';
import { UserListAPIResponse } from '../types/user';
import UserIcon from '../assets/images/user.png';
import { DataQueryKeys } from '../apis/data-query-keys';

const UserList: React.FC = () => {
  const queryClient = useQueryClient();
  console.log('🔍 QueryClient available?', queryClient);

  const { data: users, isLoading, isError, error, refetch } = useGetUserDetails();
  const updateUser = useUpdateUserDetails();
  console.log('📦 Fetched users:', users);
  console.log('Mutation error:', updateUser.error);
  console.log('Is loading?', updateUser.isLoading);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>('');

  const handleEdit = (id: number, currentName: string) => {
    console.log(`🖊️ Editing user ${id}`);
    setEditingUserId(id);
    setEditedName(currentName);
  };

  const handleSave = async (id: number) => {
    console.log(`📤 Saving user ${id} with name "${editedName}"`);
    try {
      await updateUser.mutateAsync({ id, name: editedName });
      console.log('✅ Update successful');
      await refetch(); 
      setEditingUserId(null);
      setEditedName('');
    } catch (err) {
      console.error('❌ Failed to update user:', err);
    }
  };

  if (isLoading) {
    console.log('⏳ Loading users...');
    return <p>Loading users...</p>;
  }

  if (isError) {
    console.error('❗ Error fetching users:', error);
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        marginLeft: '200px',
        marginTop: '50px',
        gap: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {users?.map((user: UserListAPIResponse) => (
        <div
          key={user.id}
          style={{
            maxWidth: '80%',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid lightgray',
          }}
        >
          <h3
            style={{
              color: 'darkblue',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            {editingUserId === user.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder={DataQueryKeys.NAME_PLACEHOLDER}
                style={{
                  border: 'none',
                  padding: '10px 25px',
                  fontSize: '18px',
                  boxShadow: '0 0 5px rgba(75, 0, 130, 0.4)',
                  flex: 1,
                }}
              />
            ) : (
              <>
                <img
                  style={{ width: '40px', cursor: 'pointer' }}
                  src={UserIcon}
                  alt="user-icon"
                />
                {user.name}
              </>
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
                  fontSize: '16px',
                  fontWeight: 'bold',
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
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  backgroundColor: '#023e8a',
                  color: 'white',
                }}
              >
                {DataQueryKeys.EDIT} 📝
              </button>
            )}
          </div>

          <p
            style={{
              color: 'black',
              fontFamily: 'regular',
              marginTop: '10px',
            }}
          >
            {user.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
