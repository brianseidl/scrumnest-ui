/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNest = /* GraphQL */ `
  mutation CreateNest($name: String!) {
    createNest(name: $name) {
      nestId
      name
      createdAt
      owner
      stories {
        nestId
        storyId
        title
        description
        owner
        status
      }
      users
    }
  }
`;
export const addNestUser = /* GraphQL */ `
  mutation AddNestUser($nestId: ID!, $username: String!) {
    addNestUser(nestId: $nestId, username: $username) {
      nestId
      name
      createdAt
      owner
      stories {
        nestId
        storyId
        title
        description
        owner
        status
      }
      users
    }
  }
`;
export const createStory = /* GraphQL */ `
  mutation CreateStory(
    $nestId: ID!
    $title: String!
    $description: String
    $owner: String
    $status: Status
  ) {
    createStory(
      nestId: $nestId
      title: $title
      description: $description
      owner: $owner
      status: $status
    ) {
      nestId
      storyId
      title
      description
      owner
      status
    }
  }
`;
