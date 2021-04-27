// Stores constants for NavBar data model here

const navBarItemsModel = [
  {
    id: 1,
    route: "/team",
    icon: "fa fa-users",
    displayDialogComponent: false,
  },
  // {
  //   id: 2,
  //   route: null,
  //   icon: "fa fa-bars",
  //   displayDialogComponent: true,
  // },
  {
    id: 3,
    route: "/",
    icon: "fa fa-home",
    displayDialogComponent: false,
  },
];

const dialogData = {
  dialogType: "optionDialog",
  closeButton: true,
  title: "Choose an Action",
  fields: [
    {
      type: "radio",
      id: "Edit-Board",
      label: "Edit Board",
      value: {
        route: "/board",
      },
    },
    {
      type: "radio",
      id: "View-Epics",
      label: "View Epics",
      value: {
        route: "/epics",
      },
    },
  ],
};

export { navBarItemsModel, dialogData };
