export type CommentResponse = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type AddCommentPayload = {
  postId: number;
  name: string;
  email: string;
  body: string;
};
