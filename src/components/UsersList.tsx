import { useGetUserDetails } from '../apis/user';

import AddNewUser from './AddNewUser';

const UserList = () => {
  const { data: users, isLoading, isError, error } = useGetUserDetails();

  if (isLoading) {
    return <p>Loading users...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'start',
        flexGrow: '1',
        textAlign: 'justify',
        marginLeft: '200px',
        gap: '20px',
        marginTop: '50px',
      }}
    >
      {users?.map(user => (
        <div style={{ color: 'darkblue' }}>
          <h2 key={user.id}>{user.name}</h2>
          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}
      
      <AddNewUser />
    </div>
  );
};

export default UserList;
