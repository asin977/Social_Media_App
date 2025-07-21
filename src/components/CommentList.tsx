import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAddComments, useGetUserList } from '../apis/user';

type CommentFormProps = {
  postId: number;
  onSuccess?: () => void;
};

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSuccess }) => {
  const [body, setBody] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUserList();

  const {
    mutate: addComment,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
    reset: resetAddError,
  } = useAddComments();

  const selectedUser = users.find(u => u.id === selectedUserId);

  useEffect(() => {
    setBody('');
    setSelectedUserId('');
    resetAddError();
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId || postId <= 0) {
      toast.error('Invalid post ID. Please select a valid post.');
      return;
    }

    if (!selectedUser) {
      toast.error('Please select a user.');
      return;
    }

    if (!body.trim()) {
      toast.error('Comment body cannot be empty.');
      return;
    }

    addComment(
      {
        postId,
        name: selectedUser.name,
        email: selectedUser.email,
        body,
      },
      {
        onSuccess: () => {
          setBody('');
          setSelectedUserId('');
          toast.success('Comment added successfully!');
          onSuccess?.();
        },
        onError: () => {
          toast.error('Failed to add comment. Please check inputs.');
        },
      },
    );
  };

  const isSubmitDisabled =
    isAdding || usersLoading || !selectedUserId || !body.trim();

  return (
    <div style={styles.container}>
      <h2>Add a Comment</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Select User:</label>
          <select
            value={selectedUserId}
            onChange={e => setSelectedUserId(Number(e.target.value))}
            disabled={usersLoading || usersError}
            required
          >
            <option value="" disabled>
              {usersLoading ? 'Loading users...' : 'Select user'}
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          {usersError && <p style={styles.error}>Failed to load users.</p>}
        </div>

        <div style={styles.field}>
          <label>Comment:</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your comment..."
            required
            rows={4}
            style={styles.textarea}
            disabled={isAdding}
          />
        </div>

        {isAddError && (
          <p style={styles.error}>
            {(addError as any)?.response?.data?.[0]?.message ||
              addError.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          style={{
            ...styles.submitBtn,
            backgroundColor: isSubmitDisabled ? '#999' : '#007bff',
            cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          {isAdding ? 'Adding...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 20,
    maxWidth: 600,
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    padding: 10,
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  submitBtn: {
    padding: '10px 16px',
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 4,
    border: 'none',
    color: '#fff',
    transition: '0.3s ease background',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
};

export default CommentForm;
