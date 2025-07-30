export type UserListAPIResponse = {
  isActive: boolean;
  id: number;
  user: string;
  name: string;
  email: string;
  gender: string;
};

export type UpdateUserPayLoad = {
  id: number;
  name?: string;
  email?: string;
};
