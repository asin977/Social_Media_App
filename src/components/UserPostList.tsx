import { useGetUserPosts } from '../apis/post';
import ErrorContainer from './ErrorContainer';
import { Header } from './Header';
import { UserPostCard } from './UserPostCard';

export const UserPostList = () => {
  const { data: posts, isLoading, isError } = useGetUserPosts();

  if (isLoading) {
    return <p>Loading Users...</p>;
  }

  if (isError) {
    <ErrorContainer message={'Failed to fetch the posts'} />;
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(500px, 1fr))',
          textAlign: 'justify',
          margin: '0 50px 35px',
          gap: '55px',
          paddingTop: '0px',
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
