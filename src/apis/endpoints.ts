export const endpoints = {
  getUserDetails: (id: string) => `public/v2/users/${id}`,
  getUserList: () => 'public/v2/users',

  getPosts: () => 'public/v2/posts',

  createUserPost: (userId: number) => `/public/v2/users/${userId}/posts`,

  getComments: () => 'public/v2/comments',
};
