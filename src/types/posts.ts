export type CreateUserPostPayload = {
  user_id: number;
  title: string;
  body: string;
};

export type Posts = {
  name: string;
  id: number;
  userId: number;
  title: string;
  body: string;
};
