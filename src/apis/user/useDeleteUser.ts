import { useMutation } from "react-query";

const TOKEN = 'bf7188bafc33522355d94c5dc844a2a3ecb964f8106af3fb75be425c587a376b';

export const useDeleteUser = () => {
  return useMutation((id: number) =>
    fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
  );
};
