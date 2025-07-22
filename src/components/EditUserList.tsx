import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';

import { useGetUserList, useUpdateUser } from '../apis/user';
import usericon from '../assets/images/user.png';
import { UserListAPIResponse } from '../types/user';

const EditUserList = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();
  let [loading, setLoading] = useState(false);

  const { mutate } = useUpdateUser();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(
    null,
  );
  const [editedName, setEditedName] = useState('');
  const [updateStatus, setUpdateStatus] = useState<null | 'success' | 'error'>(
    null,
  );

  const openModal = (user: UserListAPIResponse) => {
    setSelectedUser(user);
    setEditedName(user.name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setEditedName('');
    setUpdateStatus(null);
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    
    e.preventDefault();
  

    if (!editedName.trim() || editedName.trim() === selectedUser?.name) {
      toast.info('No changes to save.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('User name updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Error saving user. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '38px',
          color: 'darkblue',
          fontFamily: 'bold',
        }}
      >
        USERS LIST
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          justifyItems: 'start',
          textAlign: 'center',
          marginLeft: '30px',
          marginRight: '30px',
          gap: '40px',
          marginTop: '50px',
        }}
      >
        {users?.map(user => (
          <div
            key={user.id}
            style={{
              color: 'darkblue',
              backgroundColor: '#e3f2fd',
              boxShadow: '1px 2px 3px blue',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: 'column',
              width: '100%',
              padding: '20px',
            }}
          >
            <span>
              <img src={usericon} alt="usericon" style={{ width: '50px' }} />
              <h2>{user.name}</h2>
            </span>
            <p style={{ color: 'black', fontFamily: 'regular' }}>
              {user.email}
            </p>
            <div>
              <button
                onClick={() => openModal(user)}
                style={{
                  backgroundColor: 'darkblue',
                  color: 'white',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  maxWidth: '50%',
                  fontFamily: 'bold',
                  fontSize: '18px',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedUser && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              width: '400px',
              maxWidth: '90%',
            }}
          >
            <h3>Edit User</h3>
            <p>User Email: {selectedUser.email}</p>
            <div style={{ marginBottom: '15px' }}>
              <label
                htmlFor="editedName"
                style={{ display: 'block', marginBottom: '5px' }}
              >
                Name:
              </label>
              <input
                type="text"
                id="editedName"
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: '#ccc',
                  color: 'black',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={e => {
                  handleSave(e);
                  setLoading(!loading);
                }}
                style={{
                  backgroundColor: 'darkblue',
                  color: 'white',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                disabled={
                  !editedName.trim() ||
                  editedName.trim() === selectedUser?.name ||
                  loading
                }
              >
                {loading ? <ClipLoader size={15} color={'#ffffff'} /> : 'Save'}
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      )}

      {updateStatus && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        ></div>
      )}
    </>
  );
};

export default EditUserList;
