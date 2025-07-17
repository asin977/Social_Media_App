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
    setShowModal(false);
    setRefreshKey(prev => prev + 1);
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
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
            background:'transparent'
          }}
        >
          <img style={{ width: '40px' }} src={AddUserIcon} alt="AddUserIcon" />
          <span style={{color:'darkblue',fontSize:'34px'}}>Add User</span>
        </button>

        <UserList key={refreshKey} />

        {showModal && (
          <AddUserModal
            onClose={handleCloseModal}
            onSuccess={handleUserAdded}
          />
        )}
      </div>
    </>
  );
};
