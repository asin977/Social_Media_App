import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useAddUser } from '../apis/user';
import Modal from '../components/common/modal';
import {
  USER_NAME,
  USER_EMAIL,
  USER_GENDER,
  USER_STATUS,
} from '../constants/common';
import { UserListAPIResponse } from '../types/user';

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<UserListAPIResponse>>({
    [USER_NAME]: '',
    [USER_EMAIL]: '',
    [USER_GENDER]: '',
    [USER_STATUS]: '',
  });

  const handleSucessSaveBtn = () => {
    toast.success('User Successfully added');
    onSuccess();
  };

  const { mutate: addUser, isPending } = useAddUser({
    onSuccess: handleSucessSaveBtn,

    onError: (err: any) => toast.error(err?.message || 'Failed to add user'),
  });

  const handleChangeBtn = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBtnClick = () => {
    const { name, email, gender, status } = formData;
    if (!name || !email || !gender || !status) {
      toast.error('Please fill all fields');
      return;
    }

    addUser({ name, email, gender, status });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 style={{ marginBottom: '20px' }}>Add New User</h2>

      <input
        name="name"
        placeholder="Name"
        value={formData.name || ''}
        onChange={handleChangeBtn}
        style={{
          width: '100%',
          marginBottom: '12px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email || ''}
        onChange={handleChangeBtn}
        style={{
          width: '100%',
          marginBottom: '12px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <select
        name="gender"
        value={formData.gender || ''}
        onChange={handleChangeBtn}
        style={{
          width: '100%',
          marginBottom: '12px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        name="status"
        value={formData.status || ''}
        onChange={handleChangeBtn}
        style={{
          width: '100%',
          marginBottom: '12px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      >
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <button
          onClick={handleSubmitBtnClick}
          disabled={isPending}
          style={{
            color: '#fff',
            backgroundColor: '#023e8a',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '90px',
            fontFamily: 'bold',
            fontSize: '18px',
          }}
        >
          {isPending ? <ClipLoader color="#fff" size={20} /> : 'Add'}
        </button>
        <button
          onClick={onClose}
          style={{
            color: '#fff',
            backgroundColor: '#023e8a',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '90px',
            fontFamily: 'bold',
            fontSize: '18px',
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddUserModal;
