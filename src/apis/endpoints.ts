export const endpoints = {
  // users
  getUserList: () => `public/v2/users`,
  deleteUser: (userId: string) => `public/v2/users/${userId}`,
  updateUserDetails: (id: string) => `public/v2/users/${id}`,

  // post
  getPosts: () => '/public/v2/posts',
  deletePost: (postId: number) => `public/v2/posts/${postId}`,

  // comments
  getComments: () => '/public/v2/comments',
};
