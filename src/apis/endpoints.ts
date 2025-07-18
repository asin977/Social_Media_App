export const endpoints = {
  // users
  getUserDetails: (id: string) => `public${id}/user`,
  getUserList: () => 'public/v2/users',

  // post
  getPosts: () => 'public/v2/posts',
  deletePost: (userId: number) => `public/v2/posts/${userId}`,

  // comments
  getComments: () => 'public/v2/comments',
};
