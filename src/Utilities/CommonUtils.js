/**
 * Trims a value to an allotted length appending three dots at the end to indicate'
 * the value is actually longer than what is displayed
 * @param {string} value
 * @param {number} length < 0
 * @returns string or exception
 */
export function trimTextFieldValue(value, length) {
  if (length < 0) {
    throw new Error("Length must be greater than 0");
  }

  return value.length > length ? `${value.substr(0, length).trim()}...` : value;
}
