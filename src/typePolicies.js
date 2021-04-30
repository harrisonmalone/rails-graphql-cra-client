export const typePolicies = {
  Query: {
    fields: {
      fetchTasks: {
        merge(_, incoming = []) {
          return [...incoming];
        },
      },
    },
  },
};
