export const endpoints = {
  // users
  updateUserList: (id: number) => `public/v2/users/${id}`,
  getUserList: () => 'public/v2/users',

  // posts
  getPosts: () => 'public/v2/posts',

  // comments
  getComments: () => 'public/v2/comments',
};
