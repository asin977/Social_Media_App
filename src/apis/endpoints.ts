export const endpoints = {
  // users
  getUserDetails: (id: string) => `public/v2/${id}/user`,
  getUserList: (userId: string) => 'public/v2/users',

  // post
  getPosts: () => 'public/v2/posts',

  // comments
  getComments: () => 'public/v2/comments',
};
