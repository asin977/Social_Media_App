import React from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useUpdateUser } from '../apis/user';
import { UserListAPIResponse } from '../types/user';
import Modal from './common/modal';
import { USERNAME_FORM_FIELD } from '../constants/common';

type EditUserModalProps = {
  user: UserListAPIResponse;
  onClose: () => void;
};

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleSuccessSaveBtn = () => {
    toast.success('User updated successfully.');
    onClose();
  };

  const handleUpdateUser = (id: number, newName: string) => {
    updateUser(
      { id, name: newName },
      {
        onSuccess: handleSuccessSaveBtn,
        onError: () => toast.error('Failed to update the user.Try again..'),
      },
    );
  };

  const handleSaveBtnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newName = formData.get(USERNAME_FORM_FIELD)?.toString().trim();

    if (!newName) {
      toast.info('Please enter a name.');
      return;
    }

    if (newName === user.name.trim()) {
      toast.info('No changes to save.');
      return;
    }

    handleUpdateUser(user.id, newName);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <form onSubmit={handleSaveBtnClick}>
        <h3 style={{ color: 'darkblue', fontFamily: 'bold', fontSize: '30px' }}>
          Edit User
        </h3>
        <p style={{ fontFamily: 'regular', fontSize: '18px' }}>
          User Email: <strong>{user.email}</strong>
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="userNameInput"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Name:
          </label>
          <input
            type="text"
            id="userNameInput"
            name={USERNAME_FORM_FIELD}
            defaultValue={user.name}
            placeholder="Enter new name"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '18px',
            }}
          />
        </div>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: '#ccc',
              color: 'black',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: 'bold',
              fontSize: '18px',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: 'darkblue',
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: 'bold',
              fontSize: '18px',
            }}
            disabled={isPending}
          >
            {isPending ? <ClipLoader size={15} color="#fff" /> : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
