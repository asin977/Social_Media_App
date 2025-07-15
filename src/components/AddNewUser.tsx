import React, { useState } from 'react';
import { UserListAPIResponse } from '../types/user';
import UserImage from '../assets/images/add-user.png';

interface AddNewUserProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddNewUser: React.FC<AddNewUserProps> = ({ onClose, onSuccess }) => {
  const [newUser, setNewUser] = useState<Partial<UserListAPIResponse>>({
    name: '',
    email: '',
    gender: '',
    status: '',
  });

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) return;

    try {
      const response = await fetch('https://gorest.co.in/public/v2/users', {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer bf7188bafc33522355d94c5dc844a2a3ecb964f8106af3fb75be425c587a376b',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('User added successfully:', data);
        onSuccess();
        onClose();
      } else {
        console.error('Failed to add user:', data);
        alert(data[0]?.message || 'Could not add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Network error or unexpected issue');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
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
          width: '500px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <h2 style={{ color: '#023e8a', marginBottom: '20px' }}>
          <img
            src={UserImage}
            alt="user"
            style={{ width: '40px', marginRight: '12px' }}
          />
          Add New User
        </h2>

        {['name', 'email', 'gender', 'status'].map(field => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newUser[field as keyof typeof newUser] || ''}
            onChange={e => setNewUser({ ...newUser, [field]: e.target.value })}
            style={{
              width: '100%',
              marginBottom: '12px',
              padding: '10px',
              fontSize: '16px',
              boxShadow: '0 0 5px rgba(75, 0, 130, 0.2)',
            }}
          />
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={handleAddUser}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#023e8a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add
          </button>

          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#ccc',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
