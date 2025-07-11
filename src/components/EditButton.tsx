import React, { useState } from 'react';

import { User } from '../types/user';
import { DataStorageKeys } from '../apis/data-query-keys';

type NameEditProps = {
  initialName: string;
  onSave: (newName: string) => void;
  onDelete: () => void;
  user: User;
};

const EditButton: React.FC<NameEditProps> = ({
  initialName,
  onSave,
  onDelete,
  user,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    onSave(name);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: '1px solid lightgray',
        borderRadius: '8px',
        padding: '15px',
        maxWidth: '400px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h3 style={{ color: 'darkblue', fontFamily: 'bold' }}>
        👤
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={DataStorageKeys.NAME_PLACEHOLDER}
            style={{ marginLeft: '10px' }}
          />
        ) : (
          user.name
        )}
      </h3>

      <div style={{ display: 'flex', gap: '10px' }}>
        {isEditing ? (
          <button onClick={handleSave}>{DataStorageKeys.SAVE}</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            {DataStorageKeys.EDIT}
          </button>
        )}
        <button
          onClick={onDelete}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          {DataStorageKeys.DELETE}
        </button>
      </div>

      <p
        style={{
          color: 'black',
          fontFamily: 'regular',
          borderBottom: '1px solid lightgray',
          width: '90%',
          paddingBottom: '20px',
          marginTop: '10px',
        }}
      >
        {user.email}
      </p>
    </div>
  );
};

export default EditButton;
