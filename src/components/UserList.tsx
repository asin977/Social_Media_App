import React from 'react';
import { ClipLoader } from 'react-spinners';

import { useGetUserList, useDeleteUser } from '../apis/user';

import { ReactComponent as DeleteIcon } from '../assets/svg/delete.svg';

const UserList: React.FC = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();
  const { mutate: deleteUserMutation } = useDeleteUser();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <ClipLoader size={40} color="#023e8a" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '30px' }}>
        Error loading users: {error?.message || 'Something went wrong'}
      </div>
    );
  }

  const handleDeleteBtn = (userId: string) => {
    deleteUserMutation(userId);
  };

  return (
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
            padding: '40px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {user.name}
          <span
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '-50px',
              marginBottom: '20px',
            }}
          >
            <button
              style={{
                marginRight: '20px',
                padding: '5px 10px',
                color: '#fff',
                fontFamily: 'bold',
                fontSize: '18px',
                backgroundColor: '#023e8a',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => handleDeleteBtn(user?.id?.toString())}
              title="Delete user"
            >
              <DeleteIcon width={20} height={20} />
            </button>
          </span>

          <p
            style={{
              color: 'black',
              fontSize: '18px',
              fontFamily: 'regular',
              marginBottom: '10px',
            }}
          >
            {user.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
