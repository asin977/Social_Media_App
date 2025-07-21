import React, { useState } from 'react';
import { useAddComments } from '../apis/user/useAddComments';

const CommentList: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [postId] = useState(7440047); 

  const { mutate: addComment, isPending } = useAddComments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment({ postId, name, email, body });
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comment:</label><br />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentList;









