export const endpoints = {
  //users
  getUserDetails: (id: string) => `pubic/${id}/user`,
  getUserList: () => 'public/v2/users',

  //posts
  getPost: () => 'puplic/v2/posts',

  //comments
  getComments: () => 'public/v2/comments',
};
