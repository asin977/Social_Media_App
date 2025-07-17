import { useState } from 'react';
import { useCreateUserPost } from '../apis/user';
import { useFetchUsers } from '../apis/user/useFetchUsers';

export const CreateUserPost = () => {
  const { data: users, isLoading: isUserLoading } = useFetchUsers();
  const createPost = useCreateUserPost();

  const [form, setForm] = useState({
    title: '',
    body: '',
    userId: '',
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      body: form.body,
      user_id: parseInt(form.userId),
    };

    createPost.mutate(payload, {
      onSuccess: data => {
        console.log('Post created:', data);
        alert('Post created successfully');
        setForm({ title: '', body: '', userId: '' });
        setIsOpen(false);
      },
      onError: error => {
        console.error('Post creation failed:', error.message);
        alert('Failed to create post');
      },
    });
  };

  if (isUserLoading) return <p>Loading users...</p>;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>New Post</button>

      {isOpen && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <button onClick={() => setIsOpen(false)} style={closeButton}>
              ×
            </button>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
              <select
                name="userId"
                onChange={handleChange}
                value={form.userId}
                required
              >
                <option value="">Select User</option>
                {users?.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <input
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={form.title}
                required
              />
              <input
                name="body"
                placeholder="Body"
                onChange={handleChange}
                value={form.body}
                required
              />

              <button type="submit" disabled={createPost.isPending}>
                {createPost.isPending ? 'Creating...' : 'Create Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// --- Modal styles ---
const modalOverlay: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContent: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  position: 'relative',
};

const closeButton: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  fontSize: '20px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};
