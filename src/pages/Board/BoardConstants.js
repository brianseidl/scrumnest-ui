
// The userStories property is just mock data for now, but will be used as how we want our data
// structured for reference

const NEST_MODEL = [
  {
    title: 'To-Do',
    id: 'To-Do-Column',
    showAddButton: true,
    userStories: [
      {
        id: '1234',
        title: 'Creating Navbar Component',
        assignee: 'Enrique Gambra',
        description: 'This ticket is set to track the progress for creating the navbar component. For the navbar component, we expect...',
      },
      {
        id: '123',
        title: 'Creating API Services',
        assignee: 'Brian Seidl',
        description: 'This ticket is set to track the progress for creating the neccessary graphQL mutations and schemas. A great amount of work will be needed to R&D...'
      },
      {
        id: '12',
        title: 'Creating Team Page',
        assignee: 'Derrick Persaud',
        description: 'This ticket is set to track the progress for creating the team page. The team page will perform the following functions, 1) allow a user to add a teammate...',
      }
    ]
  },
  {
    title: 'In Progress',
    id: 'In-Progress-Column',
    userStories: [],
  },
  {
    title: 'Finished',
    id: 'Finished-Column',
    userStories: [],
  }
]

export { NEST_MODEL };
