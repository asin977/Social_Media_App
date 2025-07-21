export const endpoints = {
  // users
  getUserDetails: (id: string) => `public/v2/${id}/user`,
  getUserList: () => 'public/v2/users',

  // post
  getPosts: () => 'public/v2/posts',

  // comments
  getComments: () => 'public/v2/comments',
  deleteComments: (id: number) => `public/v2/${id}/comments`,
};
