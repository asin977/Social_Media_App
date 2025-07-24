export const endpoints = {
  // users
  getUserEditDetails: (id: string) => `public/v2/users/${id}`,
  getUserList: () => `public/v2/users`,
  deleteUser: (userId: string) => `public/v2/users/${userId}`,

  // posts
  getPosts: () => 'public/v2/posts',

  // comments
  getComments: () => 'public/v2/comments',
};
