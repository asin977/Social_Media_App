import { useGetUserPosts } from '../apis/post';
import { CreateUserPost } from './CreateUserPost';
import { Header } from './Header';
import { UserPostCard } from './UserPostCard';

export const UserPostList = () => {
  const { data: posts, isLoading, isError, error } = useGetUserPosts();

  if (isLoading) {
    return <p>Loading Users...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <>
      <Header />
      <h2
        style={{
          color: 'darkblue',
          fontSize: '40px',
          textAlign: 'start',
          marginLeft: '90px',
          marginBottom: '0px',
        }}
      >
        User Posts
      </h2>

      <div style={{ margin: '0 20px 20px' }}>
        <CreateUserPost />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(500px, 1fr))',
          textAlign: 'justify',
          margin: '0 50px 35px',
          gap: '60px',
          padding: '50px',
        }}
      >
        {posts?.map(post => (
          <UserPostCard
            key={post.id}
            title={post.title}
            body={post.body}
            userId={post.user_id}
          />
        ))}
      </div>
    </>
  );
};
