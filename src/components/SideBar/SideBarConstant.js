// Stores constants for SideBar data model here

const createBoardData = {
  dialogType: "createBoardDialog",
  closeButton: true,
  title: "Create a Board",
  fields: [
    {
      type: "text",
      id: "Project-Name",
      label: "Project Name",
      value: {
        route: "/board",
      },
    },
  ],
};

export { createBoardData };
