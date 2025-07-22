import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

import { UserListAPIResponse } from '../types/user';
import { useAddUser } from '../apis/user/useAddUser';

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

  const { mutate: addUser, isPending, isSuccess } = useAddUser({
    onSuccess: () => {
      toast.success('User added successfully!', { position: 'top-right' });
      onSuccess();
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to add user');
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onClose(); 
    }
  }, [isSuccess, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    <div style={modalStyles.backdrop}>
      <div style={modalStyles.modal}>
        <h2 style={{ marginBottom: '20px' }}>Add New User</h2>

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

        <div style={buttonContainerStyle}>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            style={buttonStyle}
          >
            {isPending ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              'Add'
            )}
          </button>
          <button onClick={onClose} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>
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
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
};

const inputStyle = {
  width: '100%',
  marginBottom: '12px',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  color: '#fff',
  fontSize: '16px',
  backgroundColor: '#023e8a',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  minWidth: '90px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};
