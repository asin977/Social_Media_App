import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useDeletePosts } from '../apis/user/useDeletePosts';

type DeletePostButtonProps = {
  postId: number;
  postTitle: string;
};

export const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  postId,
  postTitle,
}) => {
  const [confirming, setConfirming] = useState(false);

  const { mutate: deletePost, isPending: isDeleting, error } = useDeletePosts();

  const handleSuccessBtn = () => {
    toast.success('Post deleted successfully');
    setConfirming(false);
  };

  const handleDelete = () => {
    deletePost(postId, {
      onSuccess: handleSuccessBtn,
      onError: () => {
        toast.error('Failed to delete post');
        setConfirming(false);
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setConfirming(true)}
        disabled={isDeleting}
        style={{
          marginTop: '12px',
          padding: '8px 12px',
          backgroundColor: isDeleting ? '#ccc' : '#023E8A',
          color: 'white',
          border: 'none',
          fontFamily: 'bold',
          fontSize: '16px',
          cursor: isDeleting ? 'not-allowed' : 'pointer',
          borderRadius: '4px',
        }}
      >
        {isDeleting ? <ClipLoader size={20} color="#fff" /> : 'Delete'}
      </button>

      {confirming && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '10px',
              width: '300px',
              textAlign: 'center',
            }}
          >
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete:
              <strong> {postTitle}</strong>?
            </p>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                  backgroundColor: '#023E8A',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setConfirming(false)}
                style={{
                  backgroundColor: '#ccc',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Cancel
              </button>
            </div>
            {error && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                Error: {error.message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
