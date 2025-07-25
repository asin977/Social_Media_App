import { useGetUserList } from '../apis/user';

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
      {users?.map(user => (
        <div>
          {/* <span>
            <img src={UserIcon} alt="userIcon" style={{ width: '50px' }} />
            <h2 key={user.id}>{user.name}</h2>
          </span> */}
          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default GetUserList;
