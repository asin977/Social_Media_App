export const endpoints = {
  // users
  getUserDetails: (id: string) => `public/v2/users/${id}`,
  getUserList: () => 'public/v2/users',
  createUser: () => 'public/v2/users', // createUser endpoint

  // posts
  getPosts: () => 'public/v2/posts',

  // comments
  getComments: () => 'public/v2/comments',
};
