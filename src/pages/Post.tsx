import React, { useState, useEffect } from 'react';
import { useGetUserPosts } from '../apis/user/useGetUserPosts';
import { Post } from '../types/post';

const POST_STORAGE_KEY = 'persisted_posts';

export const PostPage: React.FC = () => {
  const { data: fetchedPosts, isLoading, isError, error } = useGetUserPosts();

  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedPost, setEditedPost] = useState<Partial<Post>>({});
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    body: '',
    user_id: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem(POST_STORAGE_KEY);
    if (stored) {
      setPosts(JSON.parse(stored));
    } else if (fetchedPosts) {
      setPosts(fetchedPosts);
      localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(fetchedPosts));
    }
  }, [fetchedPosts]);

  const handleAddPost = () => {
    if (!newPost.title || !newPost.body || !newPost.user_id) return;

    const id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const postToAdd: Post = {
      id,
      user_id: newPost.user_id!,
      title: newPost.title!,
      body: newPost.body!,
    };

    const updatedPosts = [...posts, postToAdd];
    setPosts(updatedPosts);
    localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(updatedPosts));
    setNewPost({ title: '', body: '', user_id: 0 });
  };

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditedPost({
      title: post.title,
      body: post.body,
    });
  };

  const handleSave = (id: number) => {
    const updatedPosts = posts.map(post =>
      post.id === id
        ? { ...post, title: editedPost.title || post.title, body: editedPost.body || post.body }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(updatedPosts));
    setEditingPostId(null);
    setEditedPost({});
  };
  
 

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(updatedPosts));
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  if (!posts || posts.length === 0) return <p>No posts available.</p>;

  return (
    <div
      style={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: '#f1f1f1',
      }}
    >
      <h2 style={{ color: '#023e8a' }}>📝 User Posts</h2>

      {/* Add New Post */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          style={{ marginRight: '10px', padding: '8px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={e => setNewPost({ ...newPost, body: e.target.value })}
          style={{ marginRight: '10px', padding: '8px', fontSize: '16px' }}
        />
        <input
          type="number"
          placeholder="User ID"
          value={newPost.user_id}
          onChange={e => setNewPost({ ...newPost, user_id: Number(e.target.value) })}
          style={{ marginRight: '10px', padding: '8px', fontSize: '16px' }}
        />
        <button
          onClick={handleAddPost}
          style={{
            backgroundColor: '#023e8a',
            color: 'white',
            padding: '8px 20px',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Add Post
        </button>
      </div>

      {/* Posts List */}
      {posts.map(post => (
        <div
          key={post.id}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {editingPostId === post.id ? (
            <>
              <input
                type="text"
                value={editedPost.title || ''}
                onChange={e => setEditedPost({ ...editedPost, title: e.target.value })}
                placeholder="Edit Title"
                style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
              />
              <input
                type="text"
                value={editedPost.body || ''}
                onChange={e => setEditedPost({ ...editedPost, body: e.target.value })}
                placeholder="Edit Body"
                style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
              />
              <button
                onClick={() => handleSave(post.id)}
                style={{
                  backgroundColor: '#023e8a',
                  color: 'white',
                  padding: '8px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>{post.title}</h3>
              <p style={{ color: '#666' }}>{post.body}</p>
              <p style={{ fontSize: '14px', color: '#999' }}>User ID: {post.user_id}</p>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleEdit(post)}
                  style={{
                    backgroundColor: '#023e8a',
                    color: 'white',
                    padding: '6px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '6px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
