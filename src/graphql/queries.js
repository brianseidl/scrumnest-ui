/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const nest = /* GraphQL */ `
  query Nest($nestId: ID!) {
    nest(nestId: $nestId) {
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
export const nests = /* GraphQL */ `
  query Nests {
    nests {
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
export const story = /* GraphQL */ `
  query Story($nestId: ID!, $storyId: ID!) {
    story(nestId: $nestId, storyId: $storyId) {
      nestId
      storyId
      title
      description
      owner
      status
    }
  }
`;
export const stories = /* GraphQL */ `
  query Stories($nestId: ID!) {
    stories(nestId: $nestId) {
      nestId
      storyId
      title
      description
      owner
      status
    }
  }
`;
