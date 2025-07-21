import React, { useState } from 'react';
import { useGetComments } from '../apis/user/useGetCommentList';
import { useDeleteComment } from '../apis/user/useDeleteComment';
import UserIcon from '../assets/images/commentuser.png';

const CommentList: React.FC = () => {
  const [showComments, setShowComments] = useState(false);
  const { data: comments, isPending, isError, error } = useGetComments();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  const handleDelete = (id: number) => {
    deleteComment(id);
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <button
        onClick={toggleComments}
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
          {isPending && <p>Loading comments...</p>}
          {isError && <p style={{ color: 'red' }}>Error: {error?.message}</p>}

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
              <div
                key={comment.id}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '20px',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={UserIcon}
                    alt="User"
                    style={{ width: '30px', marginRight: '10px' }}
                  />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>{comment.name}</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: 'gray' }}>{comment.email}</p>
                  </div>
                </div>

                <p style={{ marginTop: '10px', color: '#333' }}>{comment.body}</p>

                <button
                  onClick={() => handleDelete(comment.id)}
                  disabled={isDeleting}
                  style={{
                    marginTop: '10px',
                    padding: '6px 14px',
                    backgroundColor: isDeleting ? '#aaa' : 'crimson',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentList;
