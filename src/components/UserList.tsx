import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useGetUserList } from '../apis/user/useGetUserList';
import AddUserModal from '../components/AddModalUser';
import ErrorContainer from '../components/ErrorContainer';
import { UserListAPIResponse } from '../types/user';
import { UserDetailsCard } from './UserDetailsCard';

const UserList = () => {
  const { data: users, isLoading, isError, error, refetch } = useGetUserList();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(
    null,
  );

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
          fontWeight: 'bold',
          color: 'darkblue',
          marginLeft: '40px',
          textAlign: 'left',
        }}
      >
        Users List
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
          margin: '20px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
        }}
      >
        {(users || []).map(user => (
          <UserDetailsCard
            key={user.id}
            user={user}
            onUserSelect={() => setSelectedUser(user)}
            onEditBtnClick={() => {}}
          />
        ))}
      </div>

      <AddUserModal
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSuccess={() => {
          setIsAddModalVisible(false);
          refetch();
        }}
      />
    </>
  );
};

export default UserList;
