import { useGetUserPosts } from '../apis/user';
import { Header } from '../components/Header';
import UserIcon from '../assets/images/user.png';

export const GetUsersPost = () => {
  const { data: posts, isLoading, isError, error } = useGetUserPosts();

  if (isLoading) {
    return <p>Loading Users...</p>;
  }

  if (isError) {
    return <p>Error:{error?.message}</p>;
  }
  return (
    <>
      <Header />
      <h2 style={{ color: 'darkblue', fontSize: '30px', textAlign: 'center' }}>
        USER POST
      </h2>
      <div
        style={{
          display:'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyItems: 'start',
          textAlign: 'justify',
          marginLeft: '50px',
          marginRight: '50px',
          gap: '30px',
          marginBottom: '35px',
          padding: '20px',
        }}
      >
        {posts?.map(post => (
          <div
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
            <span style={{display:'flex',justifyContent:'center'}}>
              <img style={{ width: '28%', marginBottom: '10px' }} src={UserIcon} alt='UserIcon'/>
            </span>
            <h2 style={{ color: 'darkblue', textAlign: 'center' }}>{post.title}</h2>
            <p>{post.body}</p>
            <p style={{ color: 'darkred' }}>User ID: {post.user_id}</p>
          </div>
        ))}
      </div>
    </>
  );
};
