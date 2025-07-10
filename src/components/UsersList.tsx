import { useUsers } from '../hooks/FetchUsers';
import UserDetailsDisplay from './UserDetails';

const UserList = () => {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gridTemplateRows: '(3,1fr)',
        gap: '30px',
        fontSize: '18px',
        color: 'black',
        background: '#caf0f8',
        padding: '20px',
        marginLeft: '40px',
        marginRight: '40px',
        marginTop: '40px',
      }}
    >
      {data?.map(user => (
        <UserDetailsDisplay key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
