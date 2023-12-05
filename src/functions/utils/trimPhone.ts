/**
 * Trims a phone number by removing the domain part and an optional '+' prefix.
 *
 * @param {string} phone - The phone number to be trimmed.
 * @returns {string} - The trimmed phone number.
 */
export const trimPhone = (phone: string): string => {
  // Remove the domain part
  let trimmed = phone.split("@")[0];

  // Remove the '+' prefix if present
  if (trimmed.startsWith("+")) {
    trimmed = trimmed.substring(1);
  }

  return trimmed;
};
