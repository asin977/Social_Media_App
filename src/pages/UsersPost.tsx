import React, { useState, useEffect } from 'react';

import { useGetUserPosts } from '../apis/user';
import { Post } from '../types/posts';
import { Header } from '../components/Header';

export const UsersPost: React.FC = () => {
    const {data : fetchedPosts,isLoading,isError,error} =useGetUserPosts();
    const [posts,setPosts] = useState<Post[]>([])
  return (
    <div>
      <Header />
      <h2 style={{color:'darkblue',fontSize:'30px'}}>USER POSTS</h2>

      {posts.map(post => (
        <div key={post.id}
        style={{}}> 
        <h2>{post.title}</h2>
        <h2>{post.body}</h2>
      </div>
      ))}
    </div>
  );
};
