import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

import { useUpdateUser } from '../apis/user';
import { DataQueryKeys } from '../apis/data-query-keys';
import { UserListAPIResponse } from '../types/user';
import Modal from '../common/modal';
import { toastConfig } from '../utils/toastConfigure';

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
      toast.info('No changes to save.', toastConfig);
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
          toast.success('User updated successfully!', toastConfig);
          onClose();
        },
        onError: () => {
          toast.error('Failed to update user. Try again.', toastConfig);
        },
        onSettled: () => {
          setLoading(false);
        },
      },
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h3 style={{ color: 'darkblue', fontFamily: 'bold', fontSize: '30px' }}>
        Edit User
      </h3>
      <p style={{ fontFamily: 'regular', fontSize: '18px' }}>
        User Email: <strong>{user.email}</strong>
      </p>
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
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '18px',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
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
    </Modal>
  );
};

export default EditUserList;
