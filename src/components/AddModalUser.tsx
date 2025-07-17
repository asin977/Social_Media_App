import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addUser } from '../apis/user/useAddUser';
import { UserListAPIResponse } from '../types/user';
import { DataQueryKeys } from '../apis/data-query-keys';

type AddUserModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<UserListAPIResponse>>({
    name: '',
    email: '',
    gender: '',
    status: '',
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DataQueryKeys.USER_LIST] });
      onSuccess();
    },
    onError: (error: any) => {
      alert(error.message || 'Failed to add user');
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
      alert('Please fill all fields');
      return;
    }

    mutation.mutate({ name, email, status, gender });
  };

  return (
    <div style={modalStyles.backdrop}>
      <div style={modalStyles.modal}>
        <h2>Add New User</h2>

        {['name', 'email'].map(field => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field as keyof typeof formData] || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}

        <select
          name="gender"
          value={formData.gender || ''}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          name="status"
          value={formData.status || ''}
          onChange={handleChange}
          style={inputStyle}
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
            disabled={mutation.isPending}
            style={{
              color: '#fff',
              fontSize: '18px',
              backgroundColor: '#023e8a',
              border: 'none',
              padding: '5px 20px',
              fontFamily: 'bold',
            }}
          >
            Add
          </button>
          <button
            onClick={onClose}
            style={{
              color: '#fff',
              fontSize: '18px',
              backgroundColor: '#023e8a',
              border: 'none',
              padding: '5px 20px',
              fontFamily: 'bold',
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

const modalStyles = {
  backdrop: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
};

const inputStyle = {
  width: '100%',
  marginBottom: '12px',
  padding: '10px',
  fontSize: '16px',
};
