import React, { useState } from 'react';

import { Header } from '../components/Header';
import UserList from '../components/UsersList';
import AddUserModal from '../components/AddModalUser';

import AddUserIcon from '../assets/images/add-user.png';

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleUserAdded = () => {
    setRefreshKey(prev => prev + 1);
    setShowModal(false);
  };

  return (
    <>
      <Header />

      <div style={{ padding: '20px' }}>
        <button
          onClick={handleOpenModal}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
            color: 'darkblue',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <img
            style={{ width: '40px', height: '40px' }}
            src={AddUserIcon}
            alt="Add User"
          />
          <span style={{ fontSize: '24px' }}>Add User</span>
        </button>

        <UserList key={refreshKey} />

        {showModal && (
          <AddUserModal onClose={handleCloseModal} onSuccess={handleUserAdded} />
        )}
      </div>
    </>
  );
};
