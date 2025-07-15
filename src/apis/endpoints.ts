export const endpoints = {
  // users
  getUserDetails: (id: string) => `public${id}/user`,
  getUserList: () => 'public/v2/users',

  // post
  getPosts: () => 'public/v2/posts',

  // comments
  getComments: () => 'public/v2/comments',
};
