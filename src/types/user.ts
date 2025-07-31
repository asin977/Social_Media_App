export type UserListAPIResponse = {
  id: number;
  username: string;
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

export type UpdateUserPayLoad = {
  id: number;
  name?: string;
  email?: string;
};