import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

import { useUpdateUser } from '../apis/user';
import { DataQueryKeys } from '../apis/data-query-keys';
import { UserListAPIResponse } from '../types/user';

type EditUserListProps = {
  user: UserListAPIResponse;
  onClose: () => void;
};

const EditUserList: React.FC<EditUserListProps> = ({ user, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate: updateUser } = useUpdateUser();

  const [inputValue, setInputValue] = useState(user.name);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!inputValue.trim() || inputValue.trim() === user.name) {
      toast.info('No changes to save.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    updateUser(
      { id: user.id, name: inputValue },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [DataQueryKeys.USER_LIST],
          });
          toast.success('User updated successfully!', {
            position: 'top-right',
            autoClose: 3000,
          });
          onClose();
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
  };

  return (
    <>
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
          zIndex: 1000,
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
          <p>User Email: {user.email}</p>
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
              onClick={onClose}
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
                !inputValue.trim() || inputValue.trim() === user.name || loading
              }
            >
              {loading ? <ClipLoader size={15} color="#fff" /> : 'Save'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditUserList;
