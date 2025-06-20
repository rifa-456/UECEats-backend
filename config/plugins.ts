export default () => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: '10y',
      },
      rest: {
        defaultLimit: 25,
        maxLimit: 100,
      },
      register: {
        allowedFields: ["avatar"],
      },
    },
  },
});