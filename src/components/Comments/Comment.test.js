import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Comment from "./Comment";

it("should render a comment with the appropriate HTML element values", () => {
  const mockCommentObj = {
    username: "testUser",
    content: "This is a test",
    createdAt: "5/15/2021, 7:58:21 AM",
    enabled: true,
  };

  const { queryByText, queryByTitle } = render(
    <Comment comment={mockCommentObj} />
  );

  // Ensure label element renders correct value
  const label = queryByText(`by ${mockCommentObj.username}`);
  expect(label).toBeTruthy();

  // Span element should be null when enabled
  const spanElement = queryByText(` at ${mockCommentObj.createdAt}`);
  expect(spanElement).toBeNull();

  // Ensure textarea renders correct value
  const textarea = queryByText(mockCommentObj.content);
  expect(textarea).toBeTruthy();

  // Ensure save button renders
  const saveBtn = queryByTitle("Save");
  expect(saveBtn).toBeTruthy();

  // Ensure discard button renders
  const discardBtn = queryByTitle("Discard");
  expect(discardBtn).toBeTruthy();
});

describe("typing in a comment", () => {
  const mockCommentObj = {
    username: "testUser",
    content: "This is a test",
    createdAt: "5/15/2021, 7:58:21 AM",
    enabled: true,
  };

  it("should show the value the user typed in the textarea", () => {
    const { queryByText, getByRole } = render(
      <Comment comment={mockCommentObj} />
    );
    let textarea = queryByText(mockCommentObj.content);
    expect(textarea).toBeTruthy();

    let changedCommentText = ` adding some more input!`;
    userEvent.type(getByRole("textbox"), changedCommentText);

    expect(getByRole("textbox")).toHaveValue(
      `${mockCommentObj.content}${changedCommentText}`
    );
  });
});

it("should remove the save and discard button if enabled is set to false and display the date", () => {
  const mockCommentObj = {
    username: "testUser",
    content: "This is a test",
    createdAt: "5/15/2021, 7:58:21 AM",
    enabled: false,
  };

  const { queryByTitle, queryByText } = render(
    <Comment comment={mockCommentObj} />
  );

  // Span element should be truthy when not enabled
  const spanElement = queryByText(` at ${mockCommentObj.createdAt}`);
  expect(spanElement).toBeNull();

  // Ensure save button does not render
  const saveBtn = queryByTitle("Save");
  expect(saveBtn).toBeNull();

  // Ensure discard button does not render
  const discardBtn = queryByTitle("Discard");
  expect(discardBtn).toBeNull();
});
