import React from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useUpdateUserList } from '../apis/user/useUpdateUserList';
import { UserListAPIResponse } from '../types/user';
import { DataQueryKeys } from '../apis/data-query-keys';
import { useUpdateUser } from '../apis/user/useUpdateUser';

type Props = {
  users: UserListAPIResponse[];
};

const EditUserForm: React.FC<Props> = ({ users }) => {
  const { mutate, isError, error } = useUpdateUser();

  const handleEditToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const parent = e.currentTarget.closest(
      '[data-user-id]',
    ) as HTMLElement | null;
    if (!parent) return;

    const input = parent.querySelector('input') as HTMLInputElement | null;
    const display = parent.querySelector(
      '.user-name-display',
    ) as HTMLElement | null;

    if (!input || !display) return;

    const isEditing = parent.getAttribute('data-editing') === 'true';

    if (!isEditing) {
      input.style.display = 'inline-block';
      display.style.display = 'none';
      parent.setAttribute('data-editing', 'true');
      e.currentTarget.textContent = 'Save';
    } else {
      const userId = Number(parent.getAttribute('data-user-id'));
      const userEmail = parent.getAttribute('data-email') || '';
      const newName = input.value.trim();

      if (newName && newName !== display.textContent) {
        useUpdateUser.mutate({
          id: userId,
          name: newName,
          email: userEmail,
        });

        display.textContent = newName;
      }

      input.style.display = 'none';
      display.style.display = 'inline-block';
      parent.setAttribute('data-editing', 'false');
      e.currentTarget.textContent = 'Edit';
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User List </h2>
      {users.map(user => (
        <div
          key={user.id}
          data-user-id={user.id}
          data-email={user.email}
          data-editing="false"
          style={{ marginBottom: '12px' }}
        >
          <span className="user-name-display">{user.name}</span>
          <input
            type="text"
            defaultValue={user.name}
            style={{ display: 'none', marginRight: '10px' }}
            name="name"
          />
          <span style={{ margin: '0 10px' }}>{user.email}</span>
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default EditUserForm;
