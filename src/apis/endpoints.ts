export const endpoints = {
  // users
  getUserDetails: (id: string) => `/public${id}/user`,
  getUserList: () => '/public/v2/users',

  // post
  getPosts: () => '/public/v2/posts',
  deletePost: (postId: number) => `public/v2/posts/${postId}`,

  // comments
  getComments: () => '/public/v2/comments',
};
