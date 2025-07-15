import { useMutation } from 'react-query';
import axios from 'axios';

export const useUpdateUserDetails = () => {
  return useMutation((user: { id: number; name: string }) =>
    axios.put(`https://gorest.co.in/public/v2/users/${user.id}`, {
      name: user.name,
    }, {
      headers: {
        Authorization: `bf7188bafc33522355d94c5dc844a2a3ecb964f8106af3fb75be425c587a376b`, 
      },
    })
  );
};
