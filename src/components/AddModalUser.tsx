import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

import Modal from '../components/common/modal';
import { useAddUser } from '../apis/user/useAddUser';
import { UserListAPIResponse } from '../types/user';
import {
  USERNAME,
  USER_EMAIL,
  USER_GENDER,
  USER_STATUS,
} from '../constants/common';

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
    [USERNAME]: '',
    [USER_EMAIL]: '',
    [USER_GENDER]: '',
    [USER_STATUS]: '',
  });

  const { mutate: addUser, isPending } = useAddUser({
    onSuccess: () => {
      console.log('User successfully added');
      toast.success('User added successfully');
      onSuccess();
    },

    onError: (err: any) => {
      toast.error(err?.message || 'Failed to add user');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
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
        onChange={handleChange}
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
        onChange={handleChange}
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
        onChange={handleChange}
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
        onChange={handleChange}
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
          onClick={handleSubmit}
          disabled={isPending}
          style={{
            color: '#fff',
            backgroundColor: '#023e8a',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '90px',
          }}
        >
          {isPending ? <ClipLoader color="#fff" size={20} /> : 'Add'}
        </button>
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#ccc',
            color: 'black',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '90px',
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddUserModal;
