export function removeRichTextFormatting(inputString) {
  // Remove HTML tags and attributes using a regular expression
  const cleanString = inputString.replace(/<[^>]+>/g, "");

  // Remove extra whitespace by replacing consecutive spaces with a single space
  const finalString = cleanString.replace(/\s+/g, " ").trim();

  return finalString;
}
