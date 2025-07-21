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
      <h2 style={{ color: 'darkblue', fontSize: '30px' }}>USER POST</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          justifyItems: 'start',
          textAlign: 'justify',
          marginLeft: '100px',
          marginRight: '30px',
          gap: '30px',
          marginTop: '50px',
          marginBottom: '50px',
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
              fontFamily: 'bold',
              fontSize: '20px',
            }}
          >
            <span>
              <img style={{ width: '60px' }} src={UserIcon} />
            </span>
            <h2 style={{ color: 'darkblue', display: 'grid' }}>{post.title}</h2>
            <p>{post.body}</p>
            <p style={{ color: 'darkred' }}>{post.user_id}</p>
            
          </div>
        ))}
      </div>
    </>
  );
};
