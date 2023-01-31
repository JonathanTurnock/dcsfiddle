export const config = {
  envs: [
    {
      id: "mission",
      name: "Mission",
      port: 12080,
      states: ["config", "mission", "server"],
    },
    {
      id: "gui",
      name: "GUI",
      port: 12081,
      states: ["config", "mission", "export", "server"],
    },
  ],
};
