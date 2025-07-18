import React from 'react';

import { useGetComments } from '../apis/user/useGetCommentList';
import User from '../assets/images/commentuser.png';

const CommentList = () => {
  const { data: comments, isLoading, isError, error } = useGetComments();

  if (isLoading) {
    return <p>Loading Comments...</p>;
  }

  if (isError) {
    return <p>Error:{error?.message}</p>;
  }

  return (
    <div
      style={{
        textAlign: 'center',
        marginLeft: '30px',
        marginRight: '30px',
        gap: '30px',
        marginTop: '50px',
      }}
    >
      {comments?.map(comment => (
        <div
          style={{
            color: 'darkblue',
            padding: '20px',
            borderBottom: '1px solid lightgray',
            textAlign: 'justify',
          }}
        >
          <span>
            <h3
              style={{ fontSize: '18px', fontFamily: 'bold' }}
              key={comment.id}
            >
              <span>
                <img src={User} alt="user" style={{ width: '30px' }} />
              </span>
              {comment.name}
            </h3>
            <h4
              style={{
                margin: '0px',
                color: 'grey',
                fontSize: '15px',
                fontFamily: 'regular',
              }}
            >
              {comment.email}
            </h4>
            <h3 style={{ margin: '0px', color: 'black' }}>{comment.body}</h3>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
