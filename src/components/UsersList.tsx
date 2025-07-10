import { useUsers } from '../hooks/FetchUsers';
import UserDetails from './UserDetails';

const UserList = () => {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

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
        marginTop:'50px'
      }}
    >
      {data?.map(user => (
        <UserDetails key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
