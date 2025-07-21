import React, { useState } from 'react';
import { useGetUserPosts } from '../apis/user';
import { useDeletePosts } from '../apis/user/useDeletePosts';
import deleteIcon from '../assets/images/delete.png';
import UserIcon from '../assets/images/user.png';
import { Header } from '../components/Header';
import { toast } from 'react-toastify';

type Post = {
  id: number;
  title: string;
  body: string;
  user_id: number;
};

export const GetUsersPost = () => {
  const { data: posts, isPending, isError, error } = useGetUserPosts();
  const {
    mutate: deletePostMutation,
    isPending: isDeleting,
    isError: deleteError,
    error: deleteErrorInfo,
  } = useDeletePosts();

  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const confirmDelete = (post: Post) => {
    setPostToDelete(post);
  };

  const handleConfirmDelete = () => {
    if (!postToDelete) return;
    deletePostMutation(postToDelete.id, {
      onSuccess: () => {
        toast.success('Post deleted successfully');
        setPostToDelete(null);
      },
      onError: () => {
        toast.error('Failed to delete post');
        setPostToDelete(null);
      },
    });
  };

  if (isPending) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <Header />
      <h2 style={{ color: 'darkblue', fontSize: '30px', textAlign: 'center' }}>
        User Posts
      </h2>

      {deleteError && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          Deletion failed: {deleteErrorInfo?.message}
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          padding: '20px',
        }}
      >
        {posts?.map((post: Post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: '#e3f2fd',
              boxShadow: '0 2px 6px rgba(0,0,255,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <img src={UserIcon} alt="User Icon" style={{ width: '60px' }} />
            <h3 style={{ color: 'darkblue', margin: '10px 0' }}>
              {post.title}
            </h3>
            <p>{post.body}</p>
            <p style={{ color: 'darkred', fontSize: '12px' }}>
              Author ID: {post.user_id}
            </p>

            <button
              onClick={() => confirmDelete(post)}
              disabled={isDeleting}
              style={{
                marginTop: '12px',
                padding: '8px 12px',
                backgroundColor: isDeleting ? '#ccc' : '#ff4d4d',
                color: 'white',
                border: 'none',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                borderRadius: '4px',
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>

      {postToDelete && (
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
              Are you sure you want to delete{' '}
              <strong>{postToDelete.title}</strong>?
            </p>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <button
                onClick={handleConfirmDelete}
                style={{
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setPostToDelete(null)}
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
          </div>
        </div>
      )}
    </>
  );
};
