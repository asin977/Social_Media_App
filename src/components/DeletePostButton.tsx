import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useDeletePosts } from '../apis/post/useDeletePosts';
import { Modal } from './common/modal';

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

  const handleSuccessSaveBtn = () => {
    toast.success('Post deleted successfully');
    setConfirming(false);
  };

  const handleDeleteBtn = () => {
    deletePost(postId, {
      onSuccess: handleSuccessSaveBtn,
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

      <Modal isOpen={confirming} onClose={() => setConfirming(false)}>
        <h3 style={{ fontSize: '30px', color: 'darkblue' }}>Confirm Delete</h3>
        <p style={{ marginBottom: '80px' }}>
          Are you sure you want to delete: <strong>{postTitle}</strong>?
        </p>
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              onClick={handleDeleteBtn}
              disabled={isDeleting}
              style={{
                backgroundColor: '#023E8A',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '5px',
                fontFamily: 'bold',
                fontSize: '18px',
                cursor: 'pointer',
                marginBottom: '90px',
                minWidth: '120px',
              }}
            >
              Yes
            </button>
          </div>
        </div>
        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            Error: {error.message}
          </p>
        )}
      </Modal>
    </>
  );
};
