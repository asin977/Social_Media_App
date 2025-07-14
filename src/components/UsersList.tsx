import { useGetUserDetails } from '../apis/user/useGetUserList';

import UserIcon from '../assets/images/user.png';

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
          <h2
            style={{
              color: 'darkblue',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
            key={user.id}
          >
            <span
              title={user.status === 'active' ? 'Active' : 'Inactive'}
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: user.status === 'active' ? 'green' : 'red',
              }}
            ></span>

            <img
              src={UserIcon}
              alt="user-icon"
              style={{ width: '50px', cursor: 'pointer' }}
            />

            {user.name}
          </h2>

          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
