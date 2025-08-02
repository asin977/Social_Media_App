import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useGetUserList } from '../apis/user';
import { UserListAPIResponse } from '../types/user';
import ErrorContainer from './ErrorContainer';
import UserDetailsCard from './UserDetailsCard';

const UserList = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();

  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(
    null,
  );

  const handleUserSelectBtn = (user: UserListAPIResponse) => {
    setSelectedUser(user);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <ClipLoader size={40} color="#023e8a" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '30px' }}>
        <ErrorContainer message={error?.message || 'Something went wrong'} />
      </div>
    );
  }

  return (
    <>
      <h1
        style={{
          color: 'darkblue',
          fontSize: '50px',
          margin: '0',
          paddingTop: '20px',
          textAlign: 'start',
          marginLeft: '55px',
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
          paddingLeft: '50px',
          paddingRight: '50px',
          paddingBottom: '20px',
        }}
      >
        {users?.map(user => (
          <UserDetailsCard
            key={user.id}
            user={user}
            onUserSelect={handleUserSelectBtn}
          />
        ))}
      </div>
    </>
  );
};

export default UserList;
