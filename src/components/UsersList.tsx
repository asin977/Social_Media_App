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
        justifyItems: 'start',
        textAlign: 'justify',
        marginLeft: '200px',
        gap: '20px',
      }}
    >
      {data?.map(user => (
        <UserDetailsDisplay key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
