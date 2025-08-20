import { Link } from 'react-router-dom';

import { useGetUserPosts } from '../apis/post';
import { Post } from '../types/posts';
import { DeletePostButton } from './DeletePostButton';
import { routes } from '../routes';
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
      <button
        style={{
          border: 'none',
          color: '#fff',
          background: 'darkblue',
          position: 'absolute',
          top: '2%',
          right: '1%',
          padding: '5px 30px',
        }}
      >
        <Link
          to={routes.users}
          style={{
            color: '#fff',
            fontFamily: 'bold',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          USERS
        </Link>
      </button>

      <h2
        style={{
          color: 'darkblue',
          fontSize: '40px',
          textAlign: 'start',
          fontFamily: 'regular',
          marginLeft: '80px',
          marginBottom: '0px',
        }}
      >
        Users Posts
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
          gap: '50px',
          padding: '44px',
          marginLeft: '50px',
          marginRight: '50px',
          paddingTop: '25px',
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
            <p
              style={{
                textAlign: 'justify',
                marginLeft: '20px',
                marginRight: '20px',
              }}
            >
              {post.body}
            </p>
            <p
              style={{
                color: 'darkred',
                fontSize: '15px',
                textAlign: 'justify',
                fontWeight: 'bold',
              }}
            >
              Author ID: {post.user_id}
            </p>
            <DeletePostButton postId={post.id} postTitle={post.title} />
          </div>
        ))}
      </div>
    </>
  );
};
