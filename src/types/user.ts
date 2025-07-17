export type UserListAPIResponse = {
  id: number;
  user: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type UpdateUserPayLoad = {
  id: number;
  name?: string;
  email?: string;
};
