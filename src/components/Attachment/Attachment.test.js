import {
  render,
  fireEvent,
  screen,
  waitFor,
  fail,
} from "@testing-library/react";

import Attachment from "./Attachment";

it("should render a delete attachment icon, attachment title and download attachment icon", () => {
  const mockAttachmentData = {
    createdAt: "2021-05-16T12:18:42.324284",
    key: "01F5THTHDMC88453SHQKPXWKSR.JPG",
    name: "cognito-idenity-pool.JPG",
  };

  const { queryByTitle, queryByText } = render(
    <Attachment attachment={mockAttachmentData} />
  );

  const downloadBtn = queryByTitle("Download attachment");
  expect(downloadBtn).toBeTruthy();

  const deleteBtn = queryByTitle("Delete attachment");
  expect(deleteBtn).toBeTruthy();

  const label = queryByText("cognito-idenity...");
  expect(label).toBeTruthy();
});

it("should render a label value not appending the three dots at the end", () => {
  const mockAttachmentData = {
    createdAt: "2021-05-16T12:18:42.324284",
    key: "01F5THTHDMC88453SHQKPXWKSR.JPG",
    name: "test.JPG",
  };

  const { queryByText } = render(
    <Attachment attachment={mockAttachmentData} />
  );

  const label = queryByText(mockAttachmentData.name);
  expect(label).toBeTruthy();
});

it("should display an overlay when hovering over a label", async () => {
  const mockAttachmentData = {
    createdAt: "2021-05-16T12:18:42.324284",
    key: "01F5THTHDMC88453SHQKPXWKSR.JPG",
    name: "cognito-idenity-pool.JPG",
  };

  const attachmentComp = render(<Attachment attachment={mockAttachmentData} />);

  fireEvent.mouseOver(screen.queryByText("cognito-idenity..."));

  waitFor(() => attachmentComp.container.querySelector("#attachment-overlay"))
    .then(
      (onfulfilled) => {
        expect(screen.getByText(mockAttachmentData.name)).toBeTruthy();
      },
      (onrejected) => {}
    )
    .catch((onrejected) => new Error("Exception occurred ", onrejected));
});
