import React from 'react';

import { useDeleteUser, useGetUserList } from '../apis/user';

import { ReactComponent as DeleteIcon } from '../assets/svg/delete.svg';

const UserList: React.FC = () => {
  const { data: users, isLoading, isError } = useGetUserList();

  const { mutate: deleteUserMutation } = useDeleteUser();

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users.</div>;

  const handleDelete = (userId: string) => {
    deleteUserMutation(userId);
  };

  return (
    <div>
      <h2 style={{ color: 'darkblue', textAlign: 'center', fontSize: '35px' }}>
        USER LIST
      </h2>
      {users?.map(user => (
        <div
          key={user.id}
          style={{
            fontSize: '20px',
            color: 'darkblue',
            padding: '20px',
            marginLeft: '80px',
            marginBottom: '1px solid gray',
            fontFamily: 'bold',
          }}
        >
          {user.name}
          <span style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'-50px' }}>
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
              }}
              onClick={() => handleDelete(user?.id?.toString())}
            >
              <DeleteIcon />
            </button>
          </span>

          <p
            style={{
              color: 'black',
              fontSize: '18px',
              fontFamily: 'regular',
              marginBottom: '1px solid gray',
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
