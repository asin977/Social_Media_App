import React, { useState } from 'react';

import { useGetComments } from '../apis/user/useGetCommentList';
import User from '../assets/images/commentuser.png';
import { useDeleteComment } from '../apis/user/useDeleteComment';

const CommentList = () => {
  const [showComments, setShowComments] = useState(false);
  const { data: comments, isLoading, isError, error } = useGetComments();
  const { mutate: deleteUserMutation } = useDeleteComment();

  const handleToggleComments = () => {
    setShowComments(prev => !prev);
  };

  const handleDelete = ( post_id: number) => {
    deleteUserMutation( post_id);
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
              <div
                key={comment.id}
                style={{
                  color: 'darkblue',
                  padding: '20px',
                  borderBottom: '1px solid lightgray',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={User}
                    alt="user"
                    style={{ width: '30px', marginRight: '10px' }}
                  />
                  <div>
                    <h3
                      style={{
                        fontSize: '16px',
                        margin: '0',
                        fontWeight: 'bold',
                      }}
                    >
                      {comment.name}
                    </h3>
                    <h4
                      style={{
                        margin: '0',
                        color: 'gray',
                        fontSize: '14px',
                        fontWeight: 'normal',
                      }}
                    >
                      {comment.email}
                    </h4>
                  </div>
                </div>
                <p style={{ marginTop: '10px', color: 'black' }}>
                  {comment.body}
                </p>
                <button onClick={()=> handleDelete(comment?. post_id)}>delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentList;
