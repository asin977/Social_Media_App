import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUpdateUserDetails } from '../apis/user';
import { UserListAPIResponse, UpdateUserPayLoad } from '../types/user';

type EditUserFormProps = {
  user: UserListAPIResponse;
  onSuccess: () => void;
};

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSuccess }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const mutation = useMutation({
    mutationFn: useUpdateUserDetails,
    onSuccess: updatedUser => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser.id] });
      onSuccess();
    },
    onError: (error: any) => {
      console.error('Error updating user:', error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload: UpdateUserPayLoad = {
      id: user.id,
      name,
      email,
    };
    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <button type="submit"></button>
      {mutation.isError && (
        <p style={{ color: 'red' }}>Error: {mutation.error?.message}</p>
      )}
      {mutation.isSuccess && (
        <p style={{ color: 'green' }}>User updated successfully!</p>
      )}
    </form>
  );
};

export default EditUserForm;
