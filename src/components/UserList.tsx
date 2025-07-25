import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useGetUserList } from '../apis/user';
import ErrorContainer from '../components/ErrorContainer';
import { UserListAPIResponse } from '../types/user';
import EditUserModal from './EditUserModal';
import { UserDetailsCard } from './UserDetailsCard';

const UserList = () => {
  const { data: user, isLoading, isError, error } = useGetUserList();

  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(
    null,
  );
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEditBtnClick = (user: UserListAPIResponse) => {
    setSelectedUser(user);
    setIsEditModalVisible(true);
  };

  const handleUserSelect = (user: UserListAPIResponse) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setIsEditModalVisible(false);
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
          justifyItems: 'start',
          textAlign: 'justify',
          marginLeft: '30px',
          marginRight: '30px',
          gap: '30px',
          marginTop: '50px',
          marginBottom: '50px',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {(user || []).map((user, index) => (
          <UserDetailsCard
            key={index}
            user={user}
            onUserSelect={handleUserSelect}
            onEditBtnClick={handleEditBtnClick}
          />
        ))}
      </div>

      {isEditModalVisible && selectedUser && (
        <EditUserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UserList;
