export default {
  createUserResponse: (user, token) => ({
    name: user.name,
    id: user._id,
    token,
  }),
};
