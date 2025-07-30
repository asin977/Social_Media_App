import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

import { UserListAPIResponse } from '../types/user';
import {
  USER_EMAIL,
  USERNAME,
  USER_GENDER,
  USER_STATUS,
} from '../constants/common';
import { useAddUser } from '../apis/user/useAddUser';

type AddUserModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<Partial<UserListAPIResponse>>({
    [USERNAME]: '',
    [USER_EMAIL]: '',
    [USER_GENDER]: '',
    [USER_STATUS]: '',
  });

  const handleSuccessSaveBtn = () => {
    toast.success('User added successfully...');
    onClose();
  };

  const { mutate: addUser, isPending } = useAddUser({
    onSuccess: handleSuccessSaveBtn,

    onError: (err: any) => {
      toast.error(err?.message || 'Failed to add user');
    },
  });

  const handleSubmitDoubleClick = () => {
    handleSubmit();
    onClose();
  };

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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          width: '400px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Add New User</h2>

        {['name', 'email'].map(field => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field as keyof typeof formData] || ''}
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
        ))}

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
            onClick={handleSubmitDoubleClick}
            disabled={isPending}
            style={{
              color: '#fff',
              fontSize: '16px',
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
              color: '#fff',
              fontSize: '16px',
              backgroundColor: '#023e8a',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              minWidth: '90px',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
