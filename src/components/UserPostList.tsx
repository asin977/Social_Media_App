import { useGetUserPosts } from '../apis/post';
import { Post } from '../types/posts';
import { DeletePostButton } from './DeletePostButton';
import { Header } from './Header';

import UserIcon from '../assets/images/user.png';

export const UserPostList = () => {
  const { data: posts, isPending, isError, error } = useGetUserPosts();

  if (isPending) {
    return <p>Loading posts...</p>;
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
          fontFamily: 'bold',
          marginLeft: '40px',
          marginBottom: '0px',
        }}
      >
        User Posts
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
          gap: '30px',
          padding: '20px',
          marginLeft: '30px',
          marginRight: '30px',
        }}
      >
        {posts?.map((post: Post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: '#e3f2fd',
              boxShadow: '0 2px 6px rgba(0,0,255,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <img src={UserIcon} alt="User Icon" style={{ width: '60px' }} />
            <h3 style={{ color: 'darkblue', margin: '10px 0' }}>
              {post.title}
            </h3>
            <p>{post.body}</p>
            <p style={{ color: 'darkred', fontSize: '15px' }}>
              Author ID: {post.user_id}
            </p>
            <DeletePostButton postId={post.id} postTitle={post.title} />
          </div>
        ))}
      </div>
    </>
  );
};
