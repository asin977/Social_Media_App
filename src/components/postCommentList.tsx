import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetCommentList } from '../apis/comments';
import { routes } from '../routes';
import { Modal } from './common/modal';
import { PostCommentCard } from './postCommentCard';

import CommentIcon from '../assets/images/message.png';

export const PostCommentList = () => {
  const { data: comments, isLoading, isError, error } = useGetCommentList();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  if (isLoading) {
    return <p>Loading Comments...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <>
      <button
        style={{
          border: 'none',
          color: '#fff',
          background: 'darkblue',
          position: 'absolute',
          top: '2%',
          right: '1%',
          padding: '5px 45px',
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
        <button
          onClick={() => setIsViewModalOpen(true)}
          style={{
            background: '#219EBC',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            maxWidth: '220px',
            cursor: 'pointer',
          }}
        >
          <span>
            <img
              src={CommentIcon}
              alt={CommentIcon}
              style={{ width: '30px' }}
            />
          </span>
          View All Comments
        </button>

        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
        >
          <h2
            style={{
              textAlign: 'center',
              color: 'darkblue',
              fontSize: '24px',
              marginBottom: '20px',
            }}
          >
            All Comments
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 2fr))',
              gap: '20px',
              maxHeight: '70vh',
              overflowY: 'auto',
              padding: '15px',
            }}
          >
            {comments?.map(comment => (
              <PostCommentCard key={comment.id} {...comment} />
            ))}
          </div>
        </Modal>
      </div>
    </>
  );
};
