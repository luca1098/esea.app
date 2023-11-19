export const getNormalizedPath = (path: string) => {
  const [url] = path.split('?');
  return url;
};
