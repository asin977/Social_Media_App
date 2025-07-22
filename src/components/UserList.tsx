import { useState } from 'react';
import { useGetUserList } from '../apis/user';
import UserIcon from '../assets/images/user.png';
import EditUserList from './EditUserList';

const UserList = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          justifyItems: 'start',
          textAlign: 'justify',
          marginLeft: '100px',
          marginRight: '30px',
          gap: '30px',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        {users?.map(user => (
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
              padding: '50px',
              opacity: '1',
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <span>
              <img
                src={UserIcon}
                alt="userIcon"
                style={{ width: '80px', position: 'absolute' }}
              />
              <div>
                <h2 style={{ textAlign: 'end' }}>{user.name}</h2>
                <p
                  style={{
                    color: 'black',
                    fontFamily: 'regular',
                    textAlign: 'end',
                  }}
                >
                  {user.email}
                </p>
              </div>
            </span>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => handleEditClick(user)}
                style={{
                  padding: '5px 10px',
                  marginTop: '10px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  maxWidth: '100px',
                  fontSize: '18px',
                  fontFamily: 'bold',
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditOpen && selectedUser && (
        <EditUserList user={selectedUser} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UserList;
