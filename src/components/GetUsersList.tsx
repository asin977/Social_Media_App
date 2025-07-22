import { useGetUserList } from '../apis/user';
import UserIcon from '../assets/images/user.png';

const GetUserList = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        justifyItems: 'start',
        textAlign: 'center',
        marginLeft: '30px',
        marginRight: '30px',
        gap: '30px',
        marginTop: '50px',
      }}
    >
      <h2>Users List</h2>

      {users?.map(user => (
        <div
          style={{
            color: 'darkblue',
            backgroundColor: '#e3f2fd',
            boxShadow: '1px 2px 3px blue',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%',
            padding: '20px',
            marginBottom: '30px',
          }}
        >
          <span>
            <img src={UserIcon} alt="userIcon" style={{ width: '50px' }} />
            <h2 key={user.id}>{user.name}</h2>
          </span>
          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}
      <GetUserList />
    </div>
  );
};

export default GetUserList;
