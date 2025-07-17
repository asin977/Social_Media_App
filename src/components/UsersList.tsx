import { useGetUserDetails } from '../apis/user';
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
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        justifyItems: 'start',
        textAlign: 'justify',
        marginLeft: '100px',
        marginRight: '30px',
        gap: '30px',
        marginTop: '50px',
      }}
    >
     
      {users?.map(user => (
        <div
          style={{
            color: 'darkblue',
            backgroundColor: '#e3f2fd',
            boxShadow: '1px 2px 3px blue',
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%',
            padding: '20px',
          }}
        >
          <span>
            <img src={UserIcon} alt="userIcon" style={{ width: '50px' }} />
            <h2 key={user.id}>{user.name}</h2>
          </span>
          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;