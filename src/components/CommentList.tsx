import React, { useState } from 'react';

import { useAddComments } from '../apis/user';

type CommentListProps = {
  postId: number;
};

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { mutate: addComment, isPending } = useAddComments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment({ postId, name, email, body });
    setName('');
    setEmail('');
    setBody('');
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add Comment</button>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Add Comment</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Comment:</label>
                <br />
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <button type="submit" disabled={isPending}>
                  {isPending ? 'Adding...' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
};

export default CommentList;
