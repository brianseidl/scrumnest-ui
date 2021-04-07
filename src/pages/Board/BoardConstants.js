// The userStories property is just mock data for now, but will be used as how we want our data
// structured for reference

const NEST_MODEL = [
  {
    title: "To-Do",
    id: "TO_DO",
    showAddButton: true,
    userStories: [
      {
        id: "1234",
        title: "Creating Navbar Component",
        assignee: "Enrique Gambra",
        description:
          "This ticket is set to track the progress for creating the navbar component. For the navbar component, we would like three items. One, a team icon, two a hamburger menu as a 'view more' option, and three a home icon.",
      },
      {
        id: "123",
        title: "Creating API Services",
        assignee: "Brian Seidl",
        description:
          "This ticket is set to track the progress for creating the neccessary graphQL mutations and schemas.",
      },
      {
        id: "12",
        title: "Creating Team Page",
        assignee: "Derrick Persaud",
        description:
          "This ticket is set to track the progress for creating the team page. The team page will perform the following functions, 1) allow a user to add a teammate 2) remove a teammate 3) assign user permissions for a nest.",
      },
      {
        id: "1",
        title: "Create Board Page",
        assignee: "N/A",
        description:
          "This ticket tracks progress for the board page. The board page or 'Nest' as we call it, will be the main hub for viewing user stories and editing their statuses.",
      },
      {
        id: "777",
        title: "Write Weekly Report",
        assignee: "N/A",
        description:
          "This ticket is used to remind us we need to write the weekly report for Prof. Li's class on 4/8/2021.",
      },
    ],
  },
  {
    title: "In Dev",
    id: "IN_DEV",
    userStories: [],
  },
  {
    title: "QA",
    id: "QA",
    userStories: [],
  },
  {
    title: "Completed",
    id: "COMPLETED",
    userStories: [],
  },
];

export { NEST_MODEL };
