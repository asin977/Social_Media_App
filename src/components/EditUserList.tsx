import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';

import { useQueryClient } from '@tanstack/react-query';
import { DataQueryKeys } from '../apis/data-query-keys';
import { useGetUserList, useUpdateUser } from '../apis/user';
import usericon from '../assets/images/user.png';
import { UserListAPIResponse } from '../types/user';
import modal from './modal';
import UserList from './UserList';

const EditUserList = () => {
  const { data: users = [], isLoading, isError, error } = useGetUserList();
  const { mutate: updateUser } = useUpdateUser();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(
    null,
  );
  const [inputValue, setInputValue] = useState('');

  const openModal = (user: UserListAPIResponse) => {
    setSelectedUser(user);
    setInputValue(user.name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setInputValue('');
  };

  const handleSave = () => {
    if (!inputValue.trim() || inputValue.trim() === selectedUser?.name) {
      toast.info('No changes to save.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (selectedUser) {
      setLoading(true);
      updateUser(
        { id: selectedUser.id, name: inputValue },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [DataQueryKeys.USER_LIST],
            });
            toast.success('User updated successfully!', {
              position: 'top-right',
              autoClose: 3000,
            });
            closeModal();
          },
          onError: () => {
            toast.error('Failed to update user. Try again.', {
              position: 'top-right',
              autoClose: 3000,
            });
          },
          onSettled: () => {
            setLoading(false);
          },
        },
      );
    }
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '38px',
          color: 'darkblue',
          fontFamily: 'bold',
        }}
      >
        USERS LIST
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '40px',
          padding: '0 30px',
          marginTop: '50px',
        }}
      >
        {/* <UserList /> */}
        {users.map(user => (
          <div
            key={user.id}
            style={{
              color: 'darkblue',
              backgroundColor: '#e3f2fd',
              boxShadow: '1px 2px 3px blue',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <img src={usericon} alt="usericon" style={{ width: '50px' }} />
            <h2>{user.name}</h2>
            <p style={{ color: 'black' }}>{user.email}</p>
            <button
              onClick={() => openModal(user)}
              style={{
                backgroundColor: 'darkblue',
                color: 'white',
                padding: '8px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
                fontSize: '18px',
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedUser && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              width: '400px',
              maxWidth: '90%',
            }}
          >
            <h3>Edit User</h3>
            <p>User Email: {selectedUser.email}</p>
            <div style={{ marginBottom: '15px' }}>
              <label
                htmlFor="userNameInput"
                style={{ display: 'block', marginBottom: '5px' }}
              >
                Name:
              </label>
              <input
                type="text"
                id="userNameInput"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: '#ccc',
                  color: 'black',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: 'darkblue',
                  color: 'white',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                disabled={
                  !inputValue.trim() ||
                  inputValue.trim() === selectedUser.name ||
                  loading
                }
              >
                {loading ? <ClipLoader size={15} color="#fff" /> : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default EditUserList;
