import { Header } from '../components/Header';
import EditUserForm from '../components/EditUserList';
import { useGetUserList } from '../apis/user';

export const Home = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <Header />
      <EditUserForm users={users || []} />
    </>
  );
};
