import { useUsers } from '../hooks/FetchUsers';
import EditButton from './EditButton';
import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { DataStorageKeys } from '../apis/data-query-keys';
import { APIEndpoints } from '../apis/endpoints';

const UserList = () => {
  const { data, isLoading, isError, error } = useUsers(APIEndpoints.USERS);

  const [editedNames, setEditedNames] = useState<Record<string, string>>(() => {
    const stored = localStorage.getItem(DataStorageKeys.EDITED_NAMES);
    return stored ? JSON.parse(stored) : {};
  });

  const [deletedUserIds, setDeletedUserIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(DataStorageKeys.DELETED_USER_IDS);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(DataStorageKeys.EDITED_NAMES, JSON.stringify(editedNames));
  }, [editedNames]);

  useEffect(() => {
    localStorage.setItem(DataStorageKeys.DELETED_USER_IDS, JSON.stringify(Array.from(deletedUserIds)));
  }, [deletedUserIds]);

  const handleNameSave = (userId: string, newName: string) => {
    setEditedNames(prev => ({
      ...prev,
      [userId]: newName,
    }));
  };

  const handleUserDelete = (userId: string) => {
    setDeletedUserIds(prev => new Set(prev).add(userId));
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        textAlign: 'justify',
        marginLeft: '200px',
        gap: '20px',
        marginTop: '50px',
      }}
    >
      {data
        ?.filter(user => !deletedUserIds.has(user.id.toString()))
        .map((user: User) => {
          const userId = user.id.toString();
          return (
            <EditButton
              key={userId}
              user={{ ...user, name: editedNames[userId] || user.name }}
              initialName={user.name}
              onSave={(newName: string) => handleNameSave(userId, newName)}
              onDelete={() => handleUserDelete(userId)}
            />
          );
        })}
    </div>
  );
};

export default UserList;
