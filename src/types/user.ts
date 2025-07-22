export type UserListAPIResponse = {
  id: number;
  user: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type AddUserPayload = {
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
};
