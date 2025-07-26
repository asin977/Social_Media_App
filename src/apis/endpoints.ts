export const endpoints = {
  //users
  getUserDetails: (id: string) => `public/v2/users/${id}`,
  getUserList: () => 'public/v2/users',

  //posts
  getPosts: () => 'public/v2/posts',
  createUserPost: (userId: number) => `/public/v2/users/${userId}/posts`,

  //comments
  getComments: () => 'public/v2/comments',
};
