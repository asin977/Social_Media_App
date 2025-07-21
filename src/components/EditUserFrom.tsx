import React, { useState } from 'react';
import { UserListAPIResponse } from '../types/user';
import { useUpdateUser } from '../apis/user/useUpdateUser';

type Props = {
  users: UserListAPIResponse[];
};

const EditUserList: React.FC<Props> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusModal, setStatusModal] = useState<null | 'success' | 'error'>(
    null,
  );
  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(
    null,
  );
  const [editedName, setEditedName] = useState('');

  const { mutate } = useUpdateUser({
    onSuccess: () => {
      setStatusModal('success');
    },
    onError: () => {
      setStatusModal('error');
    },
  });

  const openModal = (user: UserListAPIResponse) => {
    setSelectedUser(user);
    setEditedName(user.name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setEditedName('');
  };

  const handleSave = () => {
    if (
      selectedUser &&
      editedName.trim() &&
      editedName.trim() !== selectedUser.name
    ) {
      mutate({
        id: selectedUser.id,
        name: editedName.trim(),
        email: selectedUser.email,
      });
    }
    closeModal();
  };

  const closeStatusModal = () => {
    setStatusModal(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User List</h2>
      {users.map(user => (
        <div key={user.id} style={{ marginBottom: '12px' }}>
          <span>{user.name}</span>
          <span style={{ margin: '0 10px' }}>{user.email}</span>
          <button onClick={() => openModal(user)}>Edit</button>
        </div>
      ))}

      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Edit User</h3>
            <label>
              Name:
              <input
                type="text"
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                value={selectedUser?.email}
                readOnly
                style={{ marginLeft: '10px', opacity: 0.6 }}
              />
            </label>
            <br />
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleSave} style={{ marginRight: '10px' }}>
                Save
              </button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {statusModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>{statusModal === 'success' ? 'Success' : 'Error'}</h3>
            <p>
              {statusModal === 'success'
                ? 'User name changed successfully!'
                : 'Failed to update user.'}
            </p>
            <button onClick={closeStatusModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserList;

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    minWidth: '300px',
    textAlign: 'center',
  },
};
