import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useGetUserList } from '../apis/user';
import ErrorContainer from '../components/ErrorContainer';
import { UserListAPIResponse } from '../types/user';
import EditUserList from './EditUserModal';
import { UserDetailsCard } from './UserDetailsCard';
import NotificationContainer from './common/NotificationContainer';
import { ReactComponent as EditIcon } from '../assets/svg/edit.svg';

const UserList = () => {
  const { data: users = [], isLoading, isError, error } = useGetUserList();

  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(
    null,
  );
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const handleEditBtnClick = (user: UserListAPIResponse) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleUserSelect = (user: UserListAPIResponse) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}
      >
        <ClipLoader color="#1976d2" size={60} />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorContainer message={error?.message || 'Something went wrong'} />
    );
  }

  return (
    <>
      <h1
        style={{
          fontSize: '50px',
          fontFamily: 'bold',
          textAlign: 'left',
          color: 'darkblue',
          paddingLeft: '40px',
          margin: '0px',
          marginTop: '12px',
        }}
      >
        Users
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          textAlign: 'justify',
          margin: '30px',
          gap: '30px',
        }}
      >
        {users.map((user, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <UserDetailsCard users={[user]} onUserSelect={handleUserSelect} />
            <button
              onClick={() => handleEditBtnClick(user)}
              style={{
                position: 'absolute',
                top: '150px',
                right: '15px',
                padding: '5px 10px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <EditIcon width={20} height={20} />
            </button>
          </div>
        ))}
      </div>

      {isEditModalVisible && selectedUser && (
        <EditUserList user={selectedUser} onClose={handleCloseModal} />
      )}

      <NotificationContainer />
    </>
  );
};

export default UserList;
