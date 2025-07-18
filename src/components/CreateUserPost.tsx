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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
      <button
        onClick={() => setIsOpen(true)}
        style={{
          color: 'white',
          fontFamily: 'bold',
          border: 'none',
          background: 'darkblue',
          padding:"8px 20px",
          cursor:'pointer',
          borderRadius:'4px'
        }}
      >
        ➕  New Post
      </button>

      {isOpen && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <button onClick={() => setIsOpen(false)} style={closeButton}>
              ×
            </button>
            <h2 style={{ color: 'darkblue' }}>Create New Post</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <form onSubmit={handleSubmit}>
                <select
                  style={{
                    padding: '10px',
                    border: 'none',
                    background: 'darkblue',
                    color: 'white',
                    fontFamily: 'bold',
                    marginBottom: '20px',
                  }}
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
                  style={{
                    padding: '5px 10px',
                    border: 'none',
                    fontSize: '18px',
                    boxShadow: '10px 10px 20px black',
                    marginBottom: '20px',
                  }}
                />
                <input
                  name="body"
                  placeholder="Body"
                  onChange={handleChange}
                  value={form.body}
                  required
                  style={{
                    padding: '5px 10px',
                    border: 'none',
                    fontSize: '18px',
                    boxShadow: '10px 10px 20px black',
                    marginBottom: '20px',
                  }}
                />

                <button
                  type="submit"
                  disabled={createPost.isPending}
                  style={{
                    padding: '5px 10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '130px',
                    border: 'none',
                    background: 'darkblue',
                    fontFamily: 'bold',
                    color: '#fff',
                    fontSize: '18px',
                  }}
                >
                  {createPost.isPending ? 'Creating...' : 'Create Post'}
                </button>
              </form>
            </div>
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
