import React from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useUpdateUser } from '../apis/user';
import { UserListAPIResponse } from '../types/user';
import Modal from './common/modal';

type EditUserModalProps = {
  user: UserListAPIResponse;
  onClose: () => void;
};

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleSaveBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newName = formData.get('userName')?.toString().trim()

    if (!newName || newName === user.name) {
      toast.info('No changes to save.');
      return;
    }
    
    const handleSuccessSaveBtn = () => {
      toast.success('User updated Successfully..');
      onClose();
    }

    updateUser(
      { id: user.id, name: newName },
      {
        onSuccess:handleSuccessSaveBtn,
        onError: () => {
          toast.error('Failed to update user. Try again.');
        },
      }
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <form onSubmit={handleSaveBtn}>
        
        <h3 style={{ color: 'darkblue', fontFamily: 'bold', fontSize: '30px' }}>
          Edit User
        </h3>
        <p style={{ fontFamily: 'regular', fontSize: '15px' }}>
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
            name="userName"
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
            type="submit"
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
      </form>
    </Modal>
  );
};

export default EditUserModal;






