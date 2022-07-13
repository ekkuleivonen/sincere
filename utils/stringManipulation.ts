export const limitTextLength = (text: string, length: number): string => {
  const trimmedString =
    text.length > length ? text.substring(0, length - 3) + "..." : text;
  return trimmedString;
};
