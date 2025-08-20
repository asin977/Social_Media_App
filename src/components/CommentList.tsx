import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useAddComments, useGetCommentList } from '../apis/comments';
import { useGetUserPosts } from '../apis/posts';
import { useGetUserList } from '../apis/user';
import Modal from '../components/common/modal';
import { COMMENT_BODY, EMAIL_ID, POST_ID, USER_ID } from '../constants/common';
import { Header } from './Header';
import { PostCommentCard } from './postCommentCard';

import CommentIcon from '../assets/images/comments.png';
import AddCommentIcon from '../assets/images/message.png';

export const CommentList = () => {
  const {
    data: comments,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCommentList();
  const { data: users, isLoading: isUserLoading } = useGetUserList();
  const { data: posts, isLoading: isPostsLoading } = useGetUserPosts();
  const addComment = useAddComments();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [form, setForm] = useState({
    [POST_ID]: '',
    [USER_ID]: '',
    [COMMENT_BODY]: '',
    [EMAIL_ID]: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSuccessSaveBtn = () => {
    toast.success('Comment added successfully!');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPostId = parseInt(form.postId);
    const parsedUserId = parseInt(form[USER_ID]);
    if (isNaN(parsedPostId) || isNaN(parsedUserId)) {
      toast.error('Please select a valid post and user');
      return;
    }

    const selectedUser = users?.find(u => u.id === parsedUserId);

    const payload = {
      postId: parsedPostId,
      userId: parsedUserId,
      email: form[EMAIL_ID] || selectedUser?.email || 'unknown@example.com',
      body: form[COMMENT_BODY],
      name: selectedUser?.name || 'Unknown User',
    };

    addComment.mutate(payload, {
      onSuccess: () => {
        handleSuccessSaveBtn();
        setForm({
          [POST_ID]: '',
          [USER_ID]: '',
          [COMMENT_BODY]: '',
          [EMAIL_ID]: '',
        });
        setIsAddModalOpen(false);
        refetch();
      },
      onError: () => toast.error('Failed to add comment.'),
    });
  };

  if (isLoading || isUserLoading || isPostsLoading) {
    return <p>Loading Comments, Users, or Posts...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <>
      <Header />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          padding: '0 60px 20px',
          marginTop: '50px',
        }}
      >
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            background: 'darkblue',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          <span>
            <img
              src={AddCommentIcon}
              alt={AddCommentIcon}
              style={{ width: '30px' }}
            />
          </span>{' '}
          Add Comment
        </button>
        <button
          onClick={() => setIsViewModalOpen(true)}
          style={{
            background: '#219EBC',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          <span>
            <img
              src={CommentIcon}
              alt={CommentIcon}
              style={{ width: '30px' }}
            />
          </span>{' '}
          View All Comments
        </button>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h2
          style={{
            textAlign: 'center',
            color: 'darkblue',
            fontSize: '24px',
            marginBottom: '20px',
          }}
        >
          Add New Comment
        </h2>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <select
            name={POST_ID}
            value={form[POST_ID]}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              marginBottom: '15px',
              width: '100%',
              fontWeight: 'bold',
              border: '1px solid #ccc',
            }}
          >
            <option value="">📄 Select Post</option>
            {posts?.map(post => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>

          <select
            name={USER_ID}
            value={form[USER_ID]}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              marginBottom: '15px',
              width: '100%',
              fontWeight: 'bold',
              background: 'darkblue',
              color: 'white',
              border: 'none',
            }}
          >
            <option value="">👤 Select User</option>
            {users?.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>

          <textarea
            name={COMMENT_BODY}
            placeholder="Comment"
            value={form[COMMENT_BODY]}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              marginBottom: '15px',
              fontSize: '16px',
              width: '100%',
              boxShadow: '5px 5px 10px black',
              border: 'none',
              height: '100px',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />

          <button
            type="submit"
            disabled={addComment.isPending}
            style={{
              background: 'darkblue',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            {addComment.isPending ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              'Submit Comment'
            )}
          </button>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            maxHeight: '70vh',
            overflowY: 'auto',
            padding: '10px',
          }}
        >
          {comments?.map(comment => (
            <PostCommentCard key={comment.id} {...comment} />
          ))}
        </div>
      </Modal>
    </>
  );
};
