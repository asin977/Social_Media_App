import { useGetUserDetails } from '../apis/user';

const UserList = () => {
  const { users, isLoading, isError, error } = useGetUserDetails();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

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
      <div>
        <div>
          {users?.map(user => (
            <div>
              <h2 key={user.id}>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
