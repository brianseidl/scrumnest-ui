import { render } from "@testing-library/react";

import { shallow } from "enzyme";

import Attachments from "./Attachments";

const data = [
  {
    createdAt: "2021-05-16T12:18:42.324284",
    key: "01F5THTHDMC88453SHQKPXWKSR.JPG",
    name: "cognito-idenity-pool.JPG",
  },
  {
    createdAt: "2021-04-22T23:34:40.223335+00:00",
    key: "01F3XZ4QZ2ER8FZE0R74FS7J2A.txt",
    name: "codegen-command.txt",
  },
];

it("should render a list of 2 attachments and contain a file upload field", () => {
  const attachmentsComp = render(<Attachments attachments={data} />);

  const numOfAttachments = attachmentsComp.container.querySelector(
    "#attachments-container"
  ).childElementCount;
  expect(numOfAttachments).toBe(2);

  const fileUploadField =
    attachmentsComp.container.querySelector("#file-input");
  expect(fileUploadField).toBeTruthy();
});

it("should not be able to upload a file because of file size", () => {
  const mockFileObj = {
    name: "Snake_River_(5mb).jpg",
    size: 5245329,
    type: "image/jpeg",
  };

  const attachmentsComp = shallow(<Attachments attachments={data} />);
  expect(
    attachmentsComp.instance().acceptableFileSize(mockFileObj)
  ).toBeFalsy();
});

it("should be able to upload a file because of file size", () => {
  const mockFileObj = {
    name: "file-works.jpg",
    size: 5000000,
    type: "image/jpeg",
  };

  const attachmentsComp = shallow(<Attachments attachments={data} />);
  expect(
    attachmentsComp.instance().acceptableFileSize(mockFileObj)
  ).toBeFalsy();
});

it("should return the correct file extension", () => {
  const mockFileObj = {
    name: "file-works.jpg",
    size: 5000000,
    type: "image/jpeg",
  };

  const attachmentsComp = shallow(<Attachments attachments={data} />);
  expect(attachmentsComp.instance().getFileExtension(mockFileObj.name)).toBe(
    ".jpg"
  );

  const mockFileObj2 = {
    name: "Detecting SQL Injection Attacks using Advanced Automated Techniques.docx",
    size: 28316,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };

  expect(attachmentsComp.instance().getFileExtension(mockFileObj2.name)).toBe(
    ".docx"
  );

  // TO-DO: Add more testing for various file extensions
});
