export default {
  createUserResponse: (user, token) => ({
    name: user.name,
    token,
  }),
};
