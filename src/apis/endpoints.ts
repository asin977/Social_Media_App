export const endpoints = {
  // users
  getUserList: () => `public/v2/users`,
  deleteUser: (userId: string) => `public/v2/users/${userId}`,
  updateUserDetails: (id: string) => `public/v2/users/${id}`,

  // posts
  getPosts: () => 'public/v2/posts',
  createUserPost: (userId: number) => `/public/v2/users/${userId}/posts`,

  //comments
  getComments: () => 'public/v2/comments',
};
