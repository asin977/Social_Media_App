import { useGetUserPosts } from '../apis/user';
import UserIcon from '../assets/images/user.png';
import { CreateUserPost } from '../components/CreateUserPost';
import { Header } from '../components/Header';

export const GetUsersPost = () => {
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
      <h2 style={{ color: 'darkblue', fontSize: '30px', textAlign: 'center',}}>
        USER POST
      </h2>
      <CreateUserPost />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyItems: 'start',
          textAlign: 'justify',
          margin: '50px 30px 0 100px',
          gap: '30px',
          marginBottom:'35px'
        }}
      >
        {posts?.map(post => (
          <div
            key={post.id}
            style={{
              color: 'black',
              backgroundColor: '#e3f2fd',
              boxShadow: '1px 2px 3px blue',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: 'column',
              width: '100%',
              padding: '20px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '18px',
              borderRadius: '10px',
            }}
          >
            <img
              style={{ width: '40%', marginBottom: '10px' }}
              src={UserIcon}
              alt="User Icon"
            />
            <h2 style={{ color: 'darkblue', textAlign: 'center' }}>
              {post.title}
            </h2>
            <p>{post.body}</p>
            <p style={{ color: 'darkred' }}>User ID: {post.user_id}</p>
          </div>
        ))}
      </div>
    </>
  );
};
