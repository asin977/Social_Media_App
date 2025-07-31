import { useState } from 'react';

import { Header } from '../components/Header';
import UserLists from '../components/UserList';

import AddUserIcon from '../assets/images/add-user.png';

const UserManagementPage = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleOpenModal = () => setIsAddModalVisible(true);

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
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            position: 'absolute',
            top: '1%',
          }}
        >
          <img
            style={{ width: '40px', height: '40px' }}
            src={AddUserIcon}
            alt="Add User"
          />
          <span style={{ fontSize: '24px' }}>Add User</span>
        </button>

        <UserLists />
      </div>
    </>
  );
};

export default UserManagementPage;
