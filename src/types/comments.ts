import { Key } from 'readline';

export type AddCommentPayload = {
  postId: number;
  name: string;
  email: string;
  body: string;
};

export interface CommentResponse {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}
