import { useGetCommentList } from '../apis/comments';
import { Header } from './Header';
import { PostCommentCard } from './postCommentCard';

export const CommentList = () => {
  const { data: comments, isLoading, isError, error } = useGetCommentList();

  if (isLoading) {
    return <p>Loading Comments...</p>;
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
          fontFamily: 'bold',
          textAlign: 'start',
          marginLeft: '60px',
        }}
      >
        Post Comments
      </h2>

      <div style={{ margin: '0 20px 20px' }}></div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(500px, 1fr))',
          textAlign: 'justify',
          margin: '0 50px 35px',
          gap: '30px',
          padding: '20px',
        }}
      >
        {comments?.map(comment => (
          <PostCommentCard key={comment.id} {...comment} />
        ))}
      </div>
    </>
  );
};