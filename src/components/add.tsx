import React, { useState } from 'react';

type AddUserFormProps = {
  onSuccess: () => void;
};

const AddUserForm: React.FC<AddUserFormProps> = ({ onSuccess }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!userName || !userEmail) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting to add user:', { userName, userEmail });
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('User added successfully!');
      onSuccess();
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label
            htmlFor="userName"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Name:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            disabled={isLoading}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            htmlFor="userEmail"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Email:
          </label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {isLoading ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
