import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useDeleteUser } from '../apis/user';
import { endpoints } from '../apis/endpoints';
import httpClient from '../apis/httpClient';
import { DeleteIcon } from '../assets/svg/svg';
type User = {
  email: string;
  id: string;
  name: string;
};

const fetchUsers = async (): Promise<User[]> => {
  const url = endpoints.getUserList();
  const response = await httpClient.get(url);
  console.log(response.data, '===========');

  return response.data;
};

const UserList: React.FC = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { mutate: deleteUserMutation } = useDeleteUser();

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users.</div>;

  const handleDelete = (userId: string) => {
    deleteUserMutation(userId);
  };

  return (
    <div>
      <h2 style={{ color: 'darkblue', textAlign: 'center', fontSize: '35px' }}>
        Users List
      </h2>
      {users?.map(user => (
        <div
          key={user.id}
          style={{
            fontSize: '20px',
            color: 'darkblue',
            padding: '20px',
            marginLeft:'80px',
            marginBottom: '1px solid gray',
            fontFamily:'bold'
          }}
        >
          {user.name}
          <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{marginRight:'20px',padding:'5px 10px',color:'#fff',fontFamily:'bold',fontSize:'18px',backgroundColor:'#023e8a',border:'none',borderRadius:'4px'}} onClick={() => handleDelete(user.id)}>
                   {/* <DeleteIcon /> */}Delete
                   
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
