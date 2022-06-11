export const getTitleText = (markdown: string): string => {
  const firstLine = markdown.split('\n')[0] ?? '#';
  return firstLine.replace('#', '').trimStart();
};
