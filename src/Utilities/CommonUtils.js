/**
 * Trims a value to an allotted length appending three dots at the end to indicate'
 * the value is actually longer than what is displayed
 * @param {string} value
 * @param {number} length
 * @returns
 */
export function trimTextFieldValue(value, length) {
  return value.length > length
    ? `${value.substr(0, length).trim()}...`
    : value;
}