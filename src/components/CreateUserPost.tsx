import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useCreateUserPost } from '../apis/post/useCreateUserPost';
import { useFetchUsers } from '../apis/user';
import Modal from '../components/common/modal';
import { POST_BODY, POST_TITLE, USER_ID } from '../constants/common';
import { UserPostCard } from './UserPostCard';

import PostIcon from '../assets/images/post.png';

export const CreateUserPost = () => {
  const { data: users, isLoading: isUserLoading } = useFetchUsers();
  const createPost = useCreateUserPost();

  const [form, setForm] = useState({
    [POST_TITLE]: '',
    [POST_BODY]: '',
    [USER_ID]: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [createdPosts, setCreatedPosts] = useState<
    { title: string; body: string; userId: number }[]
  >([]);

  const handleChangeBtn = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBtn = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedUserId = parseInt(form.userId);
    if (isNaN(parsedUserId)) {
      toast.error('Please select a valid user.');
      return;
    }

    const payload = {
      title: form.postTitle,
      body: form.postBody,
      userId: parsedUserId,
    };

    const handleSuccessSaveBtn = () => {
      toast.success('Post Created Successfully...');
    };

    createPost.mutate(payload, {
      onSuccess: () => {
        handleSuccessSaveBtn();
        setCreatedPosts(prev => [
          ...prev,
          {
            title: payload.title,
            body: payload.body,
            userId: parsedUserId,
          },
        ]);
        setForm({ postTitle: '', postBody: '', userId: '' });
        setIsOpen(false);
      },
      onError: () => toast.error('Failed to create new post.Try again.'),
    });
  };

  if (isUserLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <>
      <div style={{ position: 'absolute', right: '5%', top: '9%' }}>
        <select
          name="userId"
          onChange={handleChangeBtn}
          value={form.userId}
          required
          style={{
            padding: '10px',
            border: 'none',
            background: 'darkblue',
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '20px',
            borderRadius: '3px',
            boxShadow: '1px 2px 3px 4px darkblue',
            cursor: 'pointer',
            fontSize: '18px',
            textAlign: 'center',
          }}
        >
          <option value="">👤 Select User</option>
          {users?.map(user => (
            <option key={user.id} value={user.id.toString()}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        style={{
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          background: 'darkblue',
          padding: '8px 20px',
          cursor: 'pointer',
          borderRadius: '4px',
          position: 'absolute',
          top: '1%',
          left: '3%',
        }}
      >
        <img
          src={PostIcon}
          alt="postIcon"
          style={{ width: '30px', marginRight: '8px' }}
        />
        New Post
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={{ color: 'darkblue', textAlign: 'center' }}>
          Create New Post
        </h2>
        <form onSubmit={handleSubmitBtn} style={{ textAlign: 'center' }}>
          <input
            name="postTitle"
            placeholder="Title"
            onChange={handleChangeBtn}
            value={form.postTitle}
            required
            style={{
              padding: '5px 10px',
              border: 'none',
              fontSize: '18px',
              boxShadow: '10px 10px 20px black',
              marginBottom: '20px',
              width: '100%',
            }}
          />

          <textarea
            name="postBody"
            placeholder="Body"
            onChange={handleChangeBtn}
            value={form.postBody}
            required
            style={{
              padding: '5px 10px',
              border: 'none',
              fontSize: '18px',
              boxShadow: '10px 10px 20px black',
              marginBottom: '20px',
              width: '100%',
              height: '100px',
              resize: 'vertical',
              fontFamily: 'regular',
            }}
          />

          <button
            type="submit"
            disabled={createPost.isPending}
            style={{
              backgroundColor: '#023E8A',
              color: '#fff',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'bold',
              fontSize: '18px',
            }}
          >
            {createPost.isPending ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              'Create Post'
            )}
          </button>
        </form>
      </Modal>

      {createdPosts.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            padding: '20px 50px',
          }}
        >
          {createdPosts.map((post, index) => (
            <UserPostCard
              key={index}
              title={post.title}
              body={post.body}
              userId={post.userId}
            />
          ))}
        </div>
      )}
    </>
  );
};
