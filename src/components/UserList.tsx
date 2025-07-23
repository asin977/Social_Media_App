import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';

import { useGetUserList } from '../apis/user';
import UserIcon from '../assets/images/user.png';
import { ReactComponent as EditIcon } from '../assets/svg/edit.svg';
import NotificationContainer from '../common/NotificationContainer';
import ErrorContainer from '../components/ErrorContainer';
import { UserListAPIResponse } from '../types/user';
import EditUserList from './EditUserList';

const UserList = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();

  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(
    null,
  );
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleEditClick = (user: UserListAPIResponse) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}
      >
        <ClipLoader color="#1976d2" size={60} />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorContainer message={error?.message || 'Something went wrong'} />
    );
  }

  return (
    <>
      <h1
        style={{
          fontSize: '50px',
          fontFamily: 'bold',
          textAlign: 'left',
          color: 'darkblue',
          paddingLeft: '40px',
          margin: '0px',
          marginTop: '12px',
        }}
      >
        Users
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyItems: 'start',
          textAlign: 'justify',
          marginLeft: '30px',
          marginRight: '30px',
          gap: '30px',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        {users?.map((user, index) => (
          <div
            key={user.id}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              color: 'darkblue',
              backgroundColor: '#e3f2fd',
              boxShadow: '1px 2px 3px blue',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: 'column',
              width: '100%',
              padding: '40px',
              opacity: '1',
              transition:
                'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
              WebkitBoxShadow:
                hoveredCard === index
                  ? '4px 6px 12px rgba(0, 0, 255, 0.3)'
                  : '1px 2px 3px blue',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <span>
              <img
                src={UserIcon}
                alt="userIcon"
                style={{ width: '100px', position: 'absolute', left: '100px' }}
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
                <span><EditIcon width={20} height={20}/></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditModalVisible && selectedUser && (
        <EditUserList user={selectedUser} onClose={handleCloseModal} />
      )}

      <NotificationContainer />
    </>
  );
};

export default UserList;
