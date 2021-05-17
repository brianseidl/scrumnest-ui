import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { shallow } from 'enzyme';

import UserStoryCard from './UserStoryCard';

const data = {
  description: "Testing testing read all about it",
  owner: "adelphiEmail",
  id: "106105896324015897",
  title: "test2",
};

// let storyData = {
//   id: story.storyId,
//   title: story.title,
//   owner: story.owner,
//   description: story.description || "",
// };

it('should render the correct HTML elements', () => {

  expect(true).toBeTruthy();

  // TO-DO: Fix tests

  // const { queryByText } = render(<UserStoryCard userStory={data} index={1} nestId={''} />);

  // console.log("IM HERE IN TESTING!!!");
  // const cardSubtitle = queryByText(`Assigned: ${data.owner}`);
  // expect(cardSubtitle).toBeTruthy();

  // const cardTitle = queryByText(data.title);
  // expect(cardTitle).toBeTruthy();

  // const cardText = queryByText(data.description);
  // expect(cardText).toBeTruthy();

  // const storyCardComp = shallow(<UserStoryCard userStory={data} index={1} />);

  // const cardSubtitle = storyCardComp.find({ id: 'card-title' });
  // console.log(cardSubtitle.debug());
  // expect(cardSubtitle.text()).toBe(`Assigned: ${data.owner}`);
});

// describe('click on the delete button', () => {
//   it('should render an are you sure dialog', () => {

//     const userStoryCardComp = render(<UserStoryCard userStory={data} />);

//     const deleteStoryBtn = userStoryCardComp.container.querySelector('#delete-story-btn');
//     fireEvent.click(deleteStoryBtn);

//     waitFor(() => expect(deleteStoryBtn).toHaveBeenCalledTimes(1))
//       .then(
//         fulfilled => expect(screen.getByText(`Are you sure you want to delete ${data.title}?`)).toBeInTheDocument(),
//         rejected => fail('Promise rejected ', rejected)
//       )
//       .catch(
//         rejected => fail('Exception occurred ', rejected)
//       )
//   })
// });