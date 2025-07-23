import React from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useUpdateUser } from '../apis/user';
import { UserListAPIResponse } from '../types/user';
import { toastConfigure } from '../utils/toastConfigure';
import Modal from './common/modal';

type EditUserListProps = {
  user: UserListAPIResponse;
  onClose: () => void;
};

const EditUserModal: React.FC<EditUserListProps> = ({ user, onClose }) => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleSaveBtn = () => {
    const newName = (document.getElementById('userNameInput') as HTMLInputElement).value;

    if (!newName.trim() || newName.trim() === user.name) {
      toast.info('No changes to save.', toastConfigure);
      return;
    }

    updateUser(
      { id: user.id, name: newName },
      {
        onSuccess: () => {
          toast.success('User updated successfully!');
          onClose();
        },
        onError: () => {
          toast.error('Failed to update user. Try again.');
        },
      }
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
          defaultValue={user.name}
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
          onClick={handleSaveBtn}
          style={{
            backgroundColor: 'darkblue',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          disabled={isPending}
        >
          {isPending ? <ClipLoader size={15} color="#fff" /> : 'Save'}
        </button>
      </div>
    </Modal>
  );
};

export default EditUserModal