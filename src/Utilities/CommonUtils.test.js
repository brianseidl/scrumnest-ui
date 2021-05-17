import { trimTextFieldValue } from './CommonUtils';

test("trimTextFieldValue", () => {
  const testStr = 'Testing trimming of text values';

  // Within appropriate length bounds, expecting a ... appended at the end
  expect(trimTextFieldValue(testStr, 10)).toBe('Testing tr...');

  // Value equals length passed in
  expect(trimTextFieldValue(testStr, testStr.length)).toBe(testStr);

  // Length passed in is negative throws error
  expect(() => trimTextFieldValue(testStr, -1)).toThrow(new Error('Length must be greater than 0'));
});