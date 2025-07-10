import { useUsers } from '../hooks/FetchUsers';
import UserDetailsDisplay from './UserDetailsDisplay';


const UserList = () => {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="user-grid">
      {data?.map(user => (
        <UserDetailsDisplay key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
