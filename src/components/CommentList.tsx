import { useState } from 'react';

import { useGetComments } from '../apis/comments/useGetCommentList';
import { PostCommentCard } from '../components/postCommentCard';

const CommentList = () => {
  const [showComments, setShowComments] = useState(false);
  const { data: comments, isLoading, isError, error } = useGetComments();

  const handleToggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <button
        onClick={handleToggleComments}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && (
        <>
          {isLoading && <p>Loading Comments...</p>}
          {isError && <p>Error: {error?.message}</p>}
          <div
            style={{
              margin: '0 auto',
              maxWidth: '800px',
              textAlign: 'left',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
          >
            {comments?.map(comment => (
              <PostCommentCard key={comment.id} {...comment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentList;
