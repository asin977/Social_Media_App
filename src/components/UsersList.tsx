import React, { useState } from 'react';

import { DataQueryKeys } from '../apis/data-query-keys';
import { useGetUserDetails } from '../apis/user';
import { UserListAPIResponse } from '../types/user';

type NameEditProps = {
  initialName: string;
  onSave: (newName: string) => void;
  onDelete: () => void;
  user: UserListAPIResponse;
};

const UserList: React.FC<NameEditProps> = ({
  initialName,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSave = () => {
    onSave(name);
    setIsEditing(false);
  };

  const { data: users, isLoading, isError, error } = useGetUserDetails();

  if (isLoading) {
    return <p>Loading users...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        textAlign: 'justify',
        marginLeft: '200px',
        gap: '20px',
        marginTop: '50px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {users?.map(user => (
        <div key={user.id}>
          <h3 style={{ color: 'darkblue', fontWeight: 'bold' }}>
            👤{' '}
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={DataQueryKeys.NAME_PLACEHOLDER}
                style={{
                  marginLeft: '10px',
                  border: 'none',
                  padding: '10px 25px',
                  fontSize: '18px',
                  transition:
                    'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  boxShadow: isFocused
                    ? '0 0 5px rgba(75, 0, 130, 0.4)'
                    : 'none',
                }}
              />
            ) : (
              user.name
            )}
          </h3>
          <div>
            {isEditing ? (
              <button
                style={{
                  position: 'absolute',
                  right: '15%',
                  border: 'none',
                  padding: '8px 20px',
                  fontSize: '18px',
                  fontFamily: 'bold',
                  marginTop: '-21px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  backgroundColor: '#023e8a',
                  color: 'white',
                }}
                onClick={handleSave}
              >
                {DataQueryKeys.SAVE}
              </button>
            ) : (
              <button
                style={{
                  position: 'absolute',
                  right: '15%',
                  border: 'none',
                  padding: '8px 20px',
                  fontSize: '18px',
                  fontFamily: 'bold',
                  marginTop: '-21px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  backgroundColor: '#023e8a',
                  color: 'white',
                }}
                onClick={() => setIsEditing(true)}
              >
                {DataQueryKeys.EDIT}📝
              </button>
            )}
            <button
              onClick={onDelete}
              style={{
                backgroundColor: '#023e8a',
                color: 'white',
                marginLeft: '10px',
                position: 'absolute',
                right: '9%',
                border: 'none',
                padding: '8px 20px',
                fontSize: '18px',
                fontFamily: 'bold',
                marginTop: '-21px',
                borderRadius: '3px',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {DataQueryKeys.DELETE}
            </button>
          </div>

          <p
            style={{
              color: 'black',
              borderBottom: '1px solid lightgray',
              width: '90%',
              paddingBottom: '20px',
              marginTop: '10px',
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
