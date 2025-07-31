import { useState } from 'react';

import { Header } from '../components/Header';
import UserLists from '../components/UserList';
import AddUserIcon from '../assets/images/add-user.png';
import AddUserModal from '../components/AddModalUser';

const UserManagementPage = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <div style={{ position: 'absolute', top: '8px' }}>
          <button
            onClick={() => setIsAddModalVisible(true)}
            style={{
              marginLeft: '40px',
              padding: '10px 20px',
              fontSize: '18px',
              backgroundColor: 'darkblue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            <img
              style={{ width: '40px', height: '40px' }}
              src={AddUserIcon}
              alt="Add User"
            />
            <span style={{ fontSize: '24px' }}>Add User</span>
          </button>
        </div>

        <UserLists />
        <AddUserModal
          isOpen={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          onSuccess={() => {
            setIsAddModalVisible(false);
          }}
        />
      </div>
    </>
  );
};

export default UserManagementPage;
