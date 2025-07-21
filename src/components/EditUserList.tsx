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
    <>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '38px',
          color: 'darkblue',
          fontFamily: 'bold',
        }}
      >
        USERS LIST
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          justifyItems: 'start',
          textAlign: 'center',
          marginLeft: '30px',
          marginRight: '30px',
          gap: '40px',
          marginTop: '50px',
        }}
      >
        {users.map(user => (
          <div
            key={user.id}
            style={{
              color: 'darkblue',
              backgroundColor: '#e3f2fd',
              boxShadow: '1px 2px 3px blue',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: 'column',
              width: '100%',
              padding: '20px',
              marginBottom: '30px',
            }}
          >
            <span>{user.name}</span>
            <span style={{ margin: '0 10px' }}>{user.email}</span>
            <div>
              <button
                onClick={() => openModal(user)}
                style={{
                  border: 'none',
                  color: '#fff',
                  background: '#023e8a',
                  padding: '5px 10px',
                  maxWidth: '40%',
                  fontFamily: 'bold',
                  fontSize: '18px',
                  marginTop: '20px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}

        {isModalOpen && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <h3
                style={{
                  textAlign: 'center',
                  fontSize: '30px',
                  color: 'darkblue',
                  fontFamily: 'bold',
                }}
              >
                Edit User
              </h3>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <label>
                  Name:
                  <input
                    type="text"
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                    style={{
                      marginLeft: '10px',
                      border: 'none',
                      boxShadow: '1px 2px 3px black',
                      marginTop: '20px',
                      padding: '8px 20px',
                    }}
                  />
                </label>

                <label>
                  Email:
                  <input
                    type="text"
                    value={selectedUser?.email}
                    readOnly
                    style={{
                      marginLeft: '10px',
                      opacity: 0.6,
                      padding: '8px 20px',
                      border: 'none',
                      boxShadow: '1px 2px 3px black',
                      marginTop: '20px',
                    }}
                  />
                </label>
              </div>

              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={handleSave}
                  style={{
                    marginRight: '10px',
                    background: '#023e8a',
                    padding: '5px 10px',
                    maxWidth: '40%',
                    fontFamily: 'bold',
                    fontSize: '18px',
                    marginTop: '20px',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  style={{
                    marginRight: '10px',
                    background: '#023e8a',
                    padding: '5px 10px',
                    maxWidth: '40%',
                    fontFamily: 'bold',
                    fontSize: '18px',
                    marginTop: '20px',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
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
    </>
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
