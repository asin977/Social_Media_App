import { useGetUserPosts } from '../apis/user';
import { Header } from '../components/Header';

export const GetUsersPost = () => {
  const { data: posts, isLoading, isError, error } = useGetUserPosts();

  if (isLoading) {
    return <p>Loading Users...</p>;
  }

  if (isError) {
    return <p>Error:{error?.message}</p>;
  }
  return (
    <div>
      <Header />
      <h2 style={{color:'darkblue',fontSize:'30px'}}>USER POST</h2>
      {posts?.map(post => (
        <div>
          <h2 style={{color:'darkblue'}}>{post.title}</h2>
          <p>{post.body}</p>
          <p>{post.user_id}</p>
        </div>
      ))}
    </div>
  );
};
