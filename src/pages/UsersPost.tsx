import React, { useState, useEffect } from 'react';
import { useGetUserPosts } from '../apis/user/useGetUserPosts';
import { Post } from '../types/posts';
import { Header } from '../components/Header';

const POST_STORAGE_KEY = 'persisted_posts';

export const UsersPost: React.FC = () => {
  const { data: fetchedPosts, isLoading, isError, error } = useGetUserPosts();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(POST_STORAGE_KEY);
    if (stored) {
      setPosts(JSON.parse(stored));
    } else if (fetchedPosts) {
      setPosts(fetchedPosts);
      localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(fetchedPosts));
    }
  }, [fetchedPosts]);

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  if (!posts || posts.length === 0) return <p>No posts available.</p>;

  return (
    <>
      <Header />
      <h2 style={{ color: '#023e8a', fontSize: '35px' }}>USER POSTS</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: '#f1f1f1',
        }}
      >
        {posts.map(post => (
          <div
            key={post.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginLeft: '20px',
              marginRight: '20px',
            }}
          >
            <>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>
                {post.title}
              </h3>
              <p style={{ color: '#666' }}>{post.body}</p>
              <p style={{ fontSize: '14px', color: '#999' }}>
                User ID: {post.user_id}
              </p>
              <div
                style={{ marginTop: '10px', display: 'flex', gap: '10px' }}
              ></div>
            </>
          </div>
        ))}
      </div>
    </>
  );
};
