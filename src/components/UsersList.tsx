import { useUsers } from '../hooks/FetchUsers';
import UserCard from './UserDetailsDisplay';
import './UserList.css';

const UserList = () => {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="user-grid">
      {data?.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
