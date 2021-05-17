import { render } from '@testing-library/react';

import { getById } from '../../Utilities/TestUtilities';

import Comments from './Comments';

it('should render comments with the appropriate elements with a list of comments > 0', () => {

  const mockCommentsList = [
    {
      username: 'testUser',
      content: "This is a test",
      createdAt: '5/15/2021, 7:58:21 AM',
      enabled: true,
    },
    {
      username: 'testUser2',
      content: 'more test content',
      createdAt: '5/17/2021, 10:10:21 PM',
    }
  ]

  const commentsComp = render(<Comments comments={mockCommentsList} />);

  // Check if add comment div is rendered
  const addCommentBtn = commentsComp.queryByTitle('Add Comment');
  expect(addCommentBtn).toBeTruthy();

  // Check if the comment container list appropriately shows 2 comments
  const commentListLength = commentsComp.container.querySelector('#comment-container').childElementCount;
  expect(commentListLength).toBe(2);

  // Check if the div does not appear showing 'No comments'
  const noCommentDiv = commentsComp.queryByText('No comments');
  expect(noCommentDiv).toBeNull();
});

it('should render no comments and a div containing no comments with a list of comments = 0', () => {

  const mockCommentsList = [];

  const commentsComp = render(<Comments comments={mockCommentsList} />);

  // Check if the div does appear showing 'No comments'
  const noCommentDiv = commentsComp.queryByText('No comments');
  expect(noCommentDiv).toBeTruthy();

  // Check if the comment container list appropriately shows 1 child element due to the 'No comment' div rendering
  const commentListLength = commentsComp.container.querySelector('#comment-container').childElementCount;
  expect(commentListLength).toBe(1);
})